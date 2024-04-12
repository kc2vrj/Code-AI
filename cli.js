import fs from 'fs';
import { pipeline } from '@xenova/transformers';
import readlineSync from 'readline-sync';

// Create a write stream to a log file
const logStream = fs.createWriteStream('pipeline.log', { flags: 'a' });

// Custom logging function with detailed information
function logToFileSyncWithDetails(message, details = {}) {
  const timestamp = new Date().toISOString();
  let logMessage = `${timestamp} - ${message}`;

  if (Object.keys(details).length > 0) {
    logMessage += ' - Details: ' + JSON.stringify(details);
  }

  logStream.write(`${logMessage}\n`);
}

// Updated code generation function with detailed logging
async function generateCode(prompt) {
  logToFileSyncWithDetails("Generating code for prompt", { prompt });

  try {
    logToFileSyncWithDetails("Loading text generation pipeline");

    const textGenerationPipeline = await pipeline("text-generation", "Xenova/starcoderbase-1b", logToFileSyncWithDetails);
    logToFileSyncWithDetails("Pipeline loaded successfully");

    logToFileSyncWithDetails("Generating code");

    const results = await textGenerationPipeline(prompt);
    logToFileSyncWithDetails("Code generation successful", { results });

    return results;
  } catch (error) {
    logToFileSyncWithDetails("Error generating code", { error });
    throw error;
  }
}

// Main function with custom logging
async function main() {
  logToFileSyncWithDetails("Starting the code generation process...");

  while (true) {
      logToFileSyncWithDetails("Prompting user for code type...");

      console.log("What kind of code would you like to generate?");
      let prompt = await readlineSync.question();

      try {
          logToFileSyncWithDetails(`Generating code based on the prompt: ${prompt}`);
          const generatedCode = await generateCode(prompt);
          logToFileSyncWithDetails("Generated Code:\n" + generatedCode);
      } catch (error) {
          logToFileSyncWithDetails(`Error generating code: ${error}`);
          console.error("Error generating code:", error);
      }

      console.log("Would you like to generate more code (y/n)?");
      let answer = await readlineSync.question().toLowerCase();

      if (answer !== "y") {
          break;
      }
  }

  logToFileSyncWithDetails("Code generation process completed.");

  // Close the log stream after completion
  logStream.end();
  logToFileSyncWithDetails("Finished");
}

main();