export const regex = /{.*?}/g; // Regex to match references between {}

/**
 * Get value reference in theme
 * @param {*} ref 
 * @param {*} theme 
 */
export function getRefInTheme(ref, theme) {
    const category = ref.substring(
        ref.lastIndexOf("{") + 1,
        ref.lastIndexOf(".")
    );
    const component = ref.substring(
        ref.lastIndexOf(".") + 1,
        ref.lastIndexOf("}")
    );
    return theme[category][component];
}

/**
 * Validate references in string
 * @param {String} str 
 * @param {Object} theme 
 */
export const validateReferences = (str, theme) => {
    const refs = str.match(regex);
    let errorMessage = null;

    if (refs && refs.length >= 1) {
        refs.forEach(ref => {
            if (!getRefInTheme(ref, theme)) {
                errorMessage = `Reference ${ref} doesn't exists.`;
            }
        })
    }
    return errorMessage;
}