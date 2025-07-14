import * as vscode from "vscode";
import { closeUnchanged } from "./commands/closeUnchanged";
import { Change, GitExtension, Repository } from "./git";
import { closeLeft } from "./commands/closeLeft";
import { closeType } from "./commands/closeType";
import { closeExtensionTabs } from "./commands/closeExtensionTabs";
import { closeRegexpTabs } from "./commands/closeRegexpTabs";
import { closeDiffTabs } from "./commands/closeDiffTabs";

export function activate(context: vscode.ExtensionContext) {
  const closeUnchangedCmd = vscode.commands.registerCommand(
    "close-tabs.git-unchanged",
    closeUnchanged
  );

  const closeLeftCmd = vscode.commands.registerCommand(
    "close-tabs.close-left",
    closeLeft
  );

  const closeAllOfType = vscode.commands.registerCommand(
    "close-tabs.closeAllOfType",
    (uri: vscode.Uri) => closeType(uri, false)
  );

  const closeDefaultTypes = vscode.commands.registerCommand(
    "close-tabs.closeDefaultTypes",
    (uri: vscode.Uri) => closeType(uri, true)
  );

  const closeExtensionTabsCmd = vscode.commands.registerCommand(
    "close-tabs.closeExtensionTabs",
    closeExtensionTabs
  );

   const closeDiffTabsCmd = vscode.commands.registerCommand(
    "close-tabs.closeDiffTabs",
    closeDiffTabs
  );

  const closeRegexpTabsCmd = vscode.commands.registerCommand(
    "close-tabs.closeRegexpTabs",
    closeRegexpTabs
  );


  context.subscriptions.push(closeUnchangedCmd);
  context.subscriptions.push(closeLeftCmd);
  context.subscriptions.push(closeAllOfType);
  context.subscriptions.push(closeDefaultTypes);
  context.subscriptions.push(closeExtensionTabsCmd);
  context.subscriptions.push(closeDiffTabsCmd);
  context.subscriptions.push(closeRegexpTabsCmd);

  console.log("closeExtensionTabs module loaded");

}
