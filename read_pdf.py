import subprocess
import sys

try:
    import pypdf
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
    import pypdf

from pypdf import PdfReader

reader = PdfReader("doc/Traveloop.pdf")
with open("pdf_output.txt", "w", encoding="utf-8") as f:
    for i, page in enumerate(reader.pages):
        f.write(f"--- Page {i+1} ---\n")
        f.write(page.extract_text() + "\n")
