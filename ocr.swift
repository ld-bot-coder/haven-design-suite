import Cocoa
import Vision

let args = CommandLine.arguments
if args.count < 2 {
    print("Usage: swift ocr.swift <image_path>")
    exit(1)
}

let imagePath = args[1]
guard let image = NSImage(contentsOfFile: imagePath),
      let tiffData = image.tiffRepresentation,
      let bitmap = NSBitmapImageRep(data: tiffData),
      let cgImage = bitmap.cgImage else {
    print("Failed to load image.")
    exit(1)
}

let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: .init())
let request = VNRecognizeTextRequest { request, error in
    guard let observations = request.results as? [VNRecognizedTextObservation] else {
        print("No results")
        return
    }
    let recognizedStrings = observations.compactMap { observation in
        return observation.topCandidates(1).first?.string
    }
    print("--- OCR RESULTS ---")
    print(recognizedStrings.joined(separator: "\n"))
    print("-------------------")
}
request.recognitionLevel = .accurate

do {
    try requestHandler.perform([request])
} catch {
    print("Error: \(error)")
}
