/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { getTinyliciousContainer } from "@fluidframework/get-tinylicious-container";
import { getDefaultObjectFromContainer } from "@fluidframework/aqueduct";

import * as React from "react";

import { Notero } from "./fluid-object";
import { NoteroContainerFactory } from "./container";
import { NoteroView } from "./NoteroView";

// Since this is a single page fluid application we are generating a new document id
// if one was not provided
let createNew = false;
if (window.location.hash.length === 0) {
    createNew = true;
    window.location.hash = Date.now().toString();
}

const documentId = window.location.hash.substring(1);

const getContainer = async () => {
    const container = await getTinyliciousContainer(documentId, NoteroContainerFactory, createNew);
    const newDefaultObject = await getDefaultObjectFromContainer<Notero>(container);

    return newDefaultObject;
};


export const App = () => {
    const [defaultObject, setDefaultObject] = React.useState<any>(undefined);

    React.useEffect(() => {
        const fetchContainer = async () => {
            const result = await getContainer();
            setDefaultObject(result)
        }
        fetchContainer();
    }, []);

    if (defaultObject !== undefined) {
        return <NoteroView model={defaultObject} />
    }

    return <div>loading</div>

}


