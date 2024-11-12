export function getSearchRegexp(keyword: string) {
    return new RegExp(
        "(.*?)" +
        keyword.split(" ").map(escapeRegExp).join("(.*?)") +
        "(.*?)"
    )
}

function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}