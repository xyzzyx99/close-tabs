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

function matchesFilePattern(input: string): boolean {
  // This regular expression matches:
  // an opening parenthesis, followed by one or more digits,
  // followed by a space, the word "files", and a closing parenthesis
  //const pattern = /\(\d+ files\)$/;
  /*  const pattern0 = /^[a-fA-F0-9]+\s+-\s+.*\s+\(\d+ files\)$/;
    const pattern1 = /^[a-fA-F0-9]+\s+-\s+.*\s+\(1 file\)$/;
  
    const pattern2 = /^Changes\s+in\s+[a-fA-F0-9]+\s+\(1 file\)$/;
    const pattern3 = /^Changes\s+in\s+[a-fA-F0-9]+\s+\(\d+ files\)$/;
  
    return pattern0.test(input) || pattern1.test(input) || pattern2.test(input) || pattern3.test(input);
  */
  const patterns: RegExp[] = [
    /^[a-fA-F0-9]+\s+-\s+.*\s+\(\d+ files\)$/,
    /^[a-fA-F0-9]+\s+-\s+.*\s+\(1 file\)$/,

    /^Changes\s+in\s+[a-fA-F0-9]+\s+\(1 file\)$/,
    /^Changes\s+in\s+[a-fA-F0-9]+\s+\(\d+ files\)$/
  ];

  return patterns.some((regex) => regex.test(input));
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
        const result = hasMiddleSpecialUnicode(tab.label, specialChars) || matchesFilePattern(tab.label);
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
