import * as vscode from "vscode";

export const closeRegexpTabs = async (
  uri: vscode.Uri,
  defaultTypes: boolean
) => {

  try {
    //console.log("✅ closeExtensionTabs() called");

    const config = vscode.workspace.getConfiguration("closeTabs");

    const rawPatterns: string[] = config.get("regexPatterns") ?? [];

    const regexList = rawPatterns.map(p => new RegExp(p));

    vscode.window.tabGroups.all
      .flatMap((tabGroup) => tabGroup.tabs)
      .forEach((tab) => {
        if (tab.isPinned && !config.allowClosePinnedTabs) {
          console.log(`Skipping pinned tab: ${tab.label}`);
          return;
        }

        const matches = regexList.some((regex) => regex.test(tab.label));

        if (matches) {
          console.log(`🔒 Closing regexp tab: ${tab.label}`);
          vscode.window.tabGroups.close(tab, true);
        }
      });
    console.log("Finished closing tabs.");
  } catch (error) {
    vscode.window.showErrorMessage("Unexpected error while closing the tabs!");
    console.error("Error while closing tabs:", error);
  }
};
