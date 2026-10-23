import http.server
import socketserver
import webbrowser
import os
import sys
import json

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(DIRECTORY, "automations.json")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        if self.path == "/api/automations" or self.path == "/api/automations/":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
            self.end_headers()
            if os.path.exists(DB_FILE):
                with open(DB_FILE, "rb") as f:
                    self.wfile.write(f.read())
            else:
                self.wfile.write(b"[]")
            return
        super().do_GET()

    def do_POST(self):
        if self.path == "/api/automations" or self.path == "/api/automations/":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            try:
                data = json.loads(body.decode("utf-8"))
                temp_file = DB_FILE + ".tmp"
                with open(temp_file, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                os.replace(temp_file, DB_FILE)

                response = json.dumps({"status": "ok", "count": len(data) if isinstance(data, list) else 1})
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(response.encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return
        self.send_response(404)
        self.end_headers()

def main():
    socketserver.TCPServer.allow_reuse_address = True
    
    port = PORT
    server = None
    for attempt in range(10):
        try:
            server = socketserver.TCPServer(("", port), Handler)
            break
        except OSError:
            port += 1

    if not server:
        print("Could not find an open port.")
        sys.exit(1)

    url = f"http://localhost:{port}/index.html"
    print(f"Serving portfolio at: {url}")
    print("Press Ctrl+C to stop the server.")
    
    webbrowser.open(url)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
    finally:
        server.server_close()

if __name__ == "__main__":
    main()
