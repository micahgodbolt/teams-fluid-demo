import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/gitTab/index.html")
@PreventIframe("/gitTab/config.html")
@PreventIframe("/gitTab/remove.html")
export class GitTab {}
