import sys
import Quartz
import Vision
from Cocoa import NSURL

def extract_text(image_path):
    input_url = NSURL.fileURLWithPath_(image_path)
    
    request_handler = Vision.VNImageRequestHandler.alloc().initWithURL_options_(input_url, None)
    
    results = []
    def completion_handler(request, error):
        if error:
            print(f"Error: {error}")
            return
        observations = request.results()
        for observation in observations:
            top_candidate = observation.topCandidates_(1).firstObject()
            if top_candidate:
                results.append(top_candidate.string())
                
    request = Vision.VNRecognizeTextRequest.alloc().initWithCompletionHandler_(completion_handler)
    request.setRecognitionLevel_(Vision.VNRequestTextRecognitionLevelAccurate)
    
    success, error = request_handler.performRequests_error_([request], None)
    if not success:
        print(f"Failed to perform request: {error}")
    
    print("\n".join(results))

extract_text(sys.argv[1])
