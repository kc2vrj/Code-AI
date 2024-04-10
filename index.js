const { pipeline } = require("@xenova/transformers");
const readlineSync = require('readline-sync');

async function generateCode(prompt) {
    const modelPipeline = await require("@xenova/transformers");
    const pipelineFunction = modelPipeline.pipeline;
    const results = await pipelineFunction("text-generation", {
        model: "bigcode/starcoder2-7b"
    })(prompt, { max_length: 50 });
    return results[0].generated_text;
}

async function main() {
    while (true) {
        console.log("What kind of code would you like to generate?");
        let prompt = readlineSync.question();

        const generatedCode = await generateCode(prompt);
        console.log("Generated Code:\n", generatedCode);

        console.log("Would you like to generate more code (y/n)?");
        let answer = readlineSync.question().toLowerCase();

        if (answer !== "y") {
            break;
        }
    }
}

main();