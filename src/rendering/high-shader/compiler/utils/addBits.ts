// const cacheMap: Record<string, HighTemplate> = {};
// const CACHE_UID = 1;
/**
 * takes the HighFragment source parts and adds them to the hook hash
 * @param srcParts - the hash of hook arrays
 * @param parts - the code to inject into the hooks
 * @param name - optional the name of the part to add
 */
export function addBits(srcParts: Record<string, string>, parts: Record<string, string[]>, name?: string)
{
    if (srcParts)
    {
        for (const i in srcParts)
        {
            const id = i.toLocaleLowerCase();

            const part = parts[id];

            if (part)
            {
                let sanitisedPart = srcParts[i];

                if (i === 'header')
                {
                    sanitisedPart = sanitisedPart
                        .replace(/@in\s+[^;]+;\s*/g, '')
                        .replace(/@out\s+[^;]+;\s*/g, '');
                }

                if (name)
                {
                    part.push(`//----${name}----//`);
                }
                part.push(sanitisedPart);
            }

            else
            {
                console.warn(`${i} placement hook does not exist in shader`);
            }
        }
    }
}
