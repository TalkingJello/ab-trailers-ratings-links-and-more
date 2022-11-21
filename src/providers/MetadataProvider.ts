import { UNIQUE } from "../constants";

export enum VideoSite {
  YouTube = "YouTube",
  Vimeo = "Vimeo",
}

export interface Trailer {
  site: VideoSite;
  key: string;
  name: string;
}

export interface Score {
  rating: number;
  votes: number;
}

export interface OutLink {
  url: string;
  name: string;
}

export enum ProviderFlags {
  Score = "score",
  Trailers = "trailers",
  Link = "link",
  ApiKey = "api-key",
}

export abstract class MetadataProvider {
  private initilizationPromise: Promise<boolean>;
  abstract name: string;
  apiKeyInstructionsLink = "";
  testApiKey?(): Promise<boolean>;

  protected abstract init(): Promise<boolean>;
  async ensureInitialized() {
    if (this.initilizationPromise) {
      return await this.initilizationPromise;
    }

    this.initilizationPromise = this.init();
    return await this.initilizationPromise;
  }

  flags: Set<ProviderFlags> = new Set();
  flagSupported(flag: ProviderFlags) {
    return this.flags.has(flag);
  }
  flagEnabled(flag: ProviderFlags) {
    return (
      this.flagSupported(flag) &&
      JSON.parse(GM_getValue(`provider-${this.name}-enable-${flag}`, "true"))
    );
  }

  async getLink(): Promise<OutLink | false> {
    return false;
  }
  async getTrailers(): Promise<Trailer[]> {
    return [];
  }
  async getScore(): Promise<Score | false> {
    return;
  }

  insertScore(parent: JQuery<HTMLElement>, score: Score) {
    return;
  }

  static getUserApiKey(providerName: string) {
    return GM_getValue(`provider-${providerName}-api-key`, "");
  }

  getUserApiKey() {
    return GM_getValue(`provider-${this.name}-api-key`, "");
  }

  private marker: JQuery<HTMLElement>;
  private insertSetApiKeySettings(s: HTMLElement) {
    const id = `${UNIQUE}-provider-${this.name}-api-key-settings`;
    const currentApiKey = this.getUserApiKey();

    // The marker just helps us recreate the settings in the same place
    if (!this.marker) {
      this.marker = $(`<p style="display: none;"></p>`);
      $(s).append(this.marker);
    } else {
      $(`#${id}`).remove();
    }

    const div = $(`<div id="${id}"></div>`);

    // Set api key
    const set = $(`<li>
<span class="ue_left strong">API Key</span>
<span class="ue_right">
  <input type="button"
  value="${currentApiKey ? "Override Current" : "Set"} API Key"
  class="btn-${currentApiKey ? "delete" : "sub"}" style="">
  <label style="margin-left: 4px;">
  Click to set your ${this.name} API key.
  This is required for this provider to work.
  Getting an API key isn't too complicated and should only take a few minutes,
  when prompted for details on the key creation you can usually fill random information.
  <br><a target="_blank" href="${
    this.apiKeyInstructionsLink
  }">Link to further instructions.</a>
  </label>
</span>
</li>`);
    set.find("input").click(() => {
      const key = prompt(`Enter your ${this.name} API key:`, currentApiKey);
      if (typeof key === "string") {
        GM_setValue(`provider-${this.name}-api-key`, key);
        this.insertSetApiKeySettings(s);
      }
    });
    div.append(set);

    // Test api key
    if (currentApiKey) {
      const test = $(`<li>
<span class="ue_left strong">Test API Key</span>
<span class="ue_right">
  <input type="button"
  value="Test API Key"
  class="btn-sub" style="background: -webkit-gradient(linear,left top,left bottom,color-stop(0,#7eda37),color-stop(100%,#047d00));">
  <label style="margin-left: 4px;">
  Click to test and verify that the entered API key works.
  If it doesn't work make sure you entered it correctly.
  If you still need help, you can <a target="_blank" href="https://animebytes.tv/inbox.php?action=compose&to=60066">message me</a>.
  </label>
</span>
</li>`);

      const button = test.find("input");
      test.click(async () => {
        button.val("Testing...");
        button.prop("disabled", true);
        button.css("background", "gray");
        try {
          // timeout
          const result = await this.testApiKey();
          if (result) {
            alert("API key is valid!");
          } else {
            alert(`API key is invalid!`);
          }
        } catch (err) {
          alert(`API key is invalid! Error: ${err}`);
        } finally {
          button.val("Test API Key");
          button.prop("disabled", false);
          button.css(
            "background",
            "-webkit-gradient(linear,left top,left bottom,color-stop(0,#7eda37),color-stop(100%,#047d00))"
          );
        }
      });
      div.append(test);
    }

    this.marker.after(div);
  }

  insertDeliciousSettings(s: HTMLElement) {
    if (this.flagSupported(ProviderFlags.Link)) {
      delicious.settings.init(
        `provider-${this.name}-enable-${ProviderFlags.Link}`,
        true
      );
      s.appendChild(
        delicious.settings.createCheckbox(
          `provider-${this.name}-enable-${ProviderFlags.Link}`,
          "Enable Link",
          `Add a link to anime's ${this.name} page in the links section`
        )
      );
    }

    if (this.flagSupported(ProviderFlags.Score)) {
      delicious.settings.init(
        `provider-${this.name}-enable-${ProviderFlags.Score}`,
        true
      );
      s.appendChild(
        delicious.settings.createCheckbox(
          `provider-${this.name}-enable-${ProviderFlags.Score}`,
          "Enable Rating",
          `Show ratings from ${this.name}`
        )
      );
    }

    if (this.flagSupported(ProviderFlags.Trailers)) {
      delicious.settings.init(
        `provider-${this.name}-enable-${ProviderFlags.Trailers}`,
        true
      );
      s.appendChild(
        delicious.settings.createCheckbox(
          `provider-${this.name}-enable-${ProviderFlags.Trailers}`,
          "Enable Trailers",
          `Search ${this.name} for trailers`
        )
      );
    }

    if (this.flagSupported(ProviderFlags.ApiKey)) {
      this.insertSetApiKeySettings(s);
    }

    return;
  }
}
