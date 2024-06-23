from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def generate_pdf_report(data):
    # Create a canvas
    c = canvas.Canvas("sample_report.pdf", pagesize=letter)
    
    # Set initial y position
    y_position = 750
    
    # Write each data item on a new line
    for item in data:
        c.drawString(100, y_position, str(item))
        y_position -= 20
    
    # Save the canvas
    c.save()

if __name__ == "__main__":
    # Sample data (replace with your actual data)
    sample_data = [
        'Customer ID: 123',
        'Name: John Doe',
        'City: New York',
        'Balance: $1000.00'
    ]
    
    # Generate PDF report
    generate_pdf_report(sample_data)
    print("PDF report generafasdfasted successfully.")
