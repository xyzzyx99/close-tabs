import * as vscode from "vscode";

function hasMiddleSpecialUnicode(str: string, chars: string) {
  const arr = [...str]; // or: Array.from(str)
  for (let i = 1; i < arr.length - 1; i++) {
    if (chars.includes(arr[i])) {
      return true;
    }
  }
  return false;
}

export const closeDiffTabs = async (
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

        if (tab.input instanceof vscode.TabInputTextDiff) {
          console.log(`🔒 Closing diff tab: ${tab.label}`);
          vscode.window.tabGroups.close(tab, true);
          return;
        }

        const specialChars = "↔⟷";
        const result = hasMiddleSpecialUnicode(tab.label, specialChars);
        console.log(result);

        if (result) {
          console.log(`🔒 Closing diff tab: ${tab.label}`);
          vscode.window.tabGroups.close(tab, true);
        }
      });
    console.log("Finished closing tabs.");
  } catch (error) {
    vscode.window.showErrorMessage("Unexpected error while closing the tabs!");
    console.error("Error while closing tabs:", error);
  }
};
