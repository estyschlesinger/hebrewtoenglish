const text = [
    "this is a sentence",
    "this is another sentence",
    "this is the third sentence",
];
const target = "he";

export async function translateSentence() {
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    console.log("Translations:");
    translations.forEach((translation, i) => {
        console.log(`${text[i]} => (${target}) ${translation}`);
    });
}

translateSentence();