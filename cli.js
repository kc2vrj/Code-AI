// Dynamic import to load the ES Module
import { pipeline, env } from '@xenova/transformers';
import readlineSync from 'readline-sync';
// Function to generate code
async function generateCode(prompt) {
  const textGenerationPipeline = await pipeline("text-generation", "Xenova/starcoderbase-1b", console.log);
  console.log(pipline)
  const results = await textGenerationPipeline(prompt);
  return results;
}

// Main function
async function main() {
    while (true) {
        console.log("What kind of code would you like to generate?");
        let prompt = await readlineSync.question();

        try {
            const generatedCode = await generateCode(prompt);
            console.log("Generated Code:\n", generatedCode);
        } catch (error) {
            console.error("Error generating code:", error);
        }

        console.log("Would you like to generate more code (y/n)?");
        let answer = await readlineSync.question().toLowerCase();

        if (answer !== "y") {
            break;
        }
    }
}

main();