import NodeCache from "node-cache";

let appCache = null


const createCache = () => {
    if (appCache) {
        alert("Cache already exists");
        return;
    }
    appCache = new NodeCache()
    return appCache

}
export const getCache = () => {
    if (!appCache)
        appCache = createCache()

    return appCache
}

export default getCache