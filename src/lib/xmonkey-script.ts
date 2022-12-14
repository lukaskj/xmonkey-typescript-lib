import { ExecutableScript } from "./executable-script";
import { loadState } from "./state";
import { ClassType } from "./types";
import { renderComponent } from "./ui/render-component";

export class XMonkeyScript {
  public static userScript: ExecutableScript | null = null;

  public static async run(script: ClassType<ExecutableScript>): Promise<void> {
    if (!script) {
      throw new Error("Script not defined.");
    }
    const scriptObject = new script();

    return await XMonkeyScript.runScriptObject(scriptObject);
  }

  public static async runScriptObject(scriptObject: ExecutableScript): Promise<void> {
    if (!scriptObject) {
      throw new Error("Script object not defined.");
    }

    XMonkeyScript.userScript = scriptObject;

    loadState();

    console.log(`[+] Running XMonkey Script: ${scriptObject.title}`);

    await scriptObject.execute();
    scriptObject.setExecuted();
    renderComponent(scriptObject);
  }
}
