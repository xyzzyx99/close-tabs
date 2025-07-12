import * as vscode from "vscode";

export const closeExtensionTabs = async (
  uri: vscode.Uri,
  defaultTypes: boolean
) => {
  console.log("✅ closeExtensionTabs() called");
  try {
    const config = vscode.workspace.getConfiguration("closeTabs");

    vscode.window.tabGroups.all
      .flatMap((tabGroup) => tabGroup.tabs)
      .forEach((tab) => {
        if (tab.isPinned && !config.allowClosePinnedTabs) {
          console.log(`Skipping pinned tab: ${tab.label}`);
          return;
        }
        const input = tab.input as any;

        //      if (typeof input?.viewType === "string" && tab.label.startsWith("Extension:")) {
        if (tab.label.startsWith("Extension:")) {
          console.log(`🔒 Closing extension tab: ${tab.label}`);
          vscode.window.tabGroups.close(tab, true);
        }
      });
    console.log("Finished closing tabs.");
  } catch (error) {
    vscode.window.showErrorMessage("Unexpected error while closing the tabs!");
    console.error("Error while closing tabs:", error);
  }
};
