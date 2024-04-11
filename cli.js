import fs from 'fs';
import { pipeline, env } from '@xenova/transformers';
import readlineSync from 'readline-sync';

// Create a write stream to a log file
const logStream = fs.createWriteStream('log.txt', { flags: 'a' });

// Function to log messages to the file
function logToFileSync(message) {
  logStream.write(`${message}\n`);
}

// Function to generate code
async function generateCode(prompt) {
  logToFileSync(`Generating code for prompt: ${prompt}`);

  try {
    logToFileSync("Loading text generation pipeline...");
    const textGenerationPipeline = await pipeline("text-generation", "Xenova/starcoderbase-1b", logToFileSync);
    logToFileSync("Pipeline loaded successfully");

    logToFileSync("Generating code...");
    const results = await textGenerationPipeline(prompt);
    logToFileSync("Code generation successful");
    return results;
  } catch (error) {
    logToFileSync(`Error generating code: ${error}`);
    throw error; // Rethrow the error to handle it in the main function
  }
}

// Main function
async function main() {
    while (true) {
        logToFileSync("Starting the code generation process...");

        console.log("What kind of code would you like to generate?");
        let prompt = await readlineSync.question();

        try {
            logToFileSync(`Generating code based on the prompt: ${prompt}`);
            const generatedCode = await generateCode(prompt);
            logToFileSync("Generated Code:\n" + generatedCode);
        } catch (error) {
            logToFileSync(`Error generating code: ${error}`);
            console.error("Error generating code:", error);
        }

        console.log("Would you like to generate more code (y/n)?");
        let answer = await readlineSync.question().toLowerCase();

        if (answer !== "y") {
            break;
        }
    }

    logToFileSync("Code generation process completed.");
}

main();