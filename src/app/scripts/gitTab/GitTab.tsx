import * as React from "react";
import {
  Provider,
  Flex,
  Text,
  Button,
  Header,
} from "@fluentui/react-northstar";
import TeamsBaseComponent, {
  ITeamsBaseComponentState,
} from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
import * as jwt from "jsonwebtoken";
import { App } from "../components/app";
/**
 * State for the gitTabTab React component
 */
export interface IGitTabState extends ITeamsBaseComponentState {
  entityId?: string;
  name?: string;
  error?: string;
}

/**
 * Properties for the gitTabTab React component
 */
export interface IGitTabProps {}

/**
 * Implementation of the git Tab content page
 */
export class GitTab extends TeamsBaseComponent<IGitTabProps, IGitTabState> {
  public async componentWillMount() {
    this.updateTheme(this.getQueryVariable("theme"));

    microsoftTeams.initialize(() => {
      microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
      microsoftTeams.getContext((context) => {
        this.setState({
          entityId: context.entityId,
        });
        this.updateTheme(context.theme);
        microsoftTeams.authentication.getAuthToken({
          successCallback: (token: string) => {
            const decoded: { [key: string]: any } = jwt.decode(token) as {
              [key: string]: any;
            };
            this.setState({ name: decoded!.name });
            microsoftTeams.appInitialization.notifySuccess();
          },
          failureCallback: (message: string) => {
            this.setState({ error: message });
            microsoftTeams.appInitialization.notifyFailure({
              reason: microsoftTeams.appInitialization.FailedReason.AuthFailed,
              message,
            });
          },
          resources: [process.env.GITTAB_APP_URI as string],
        });
      });
    });
  }

  /**
   * The render() method to create the UI of the tab
   */
  public render() {
    return (
      <Provider theme={this.state.theme}>
        <App />
      </Provider>
    );
  }
}
