import pytesseract
import re
from PIL import Image

def extract_payslip_data(image_path):
    text = pytesseract.image_to_string(Image.open(image_path))
    print("=== RAW OCR TEXT ===")
    print(text)

    patterns = {
        "company": r"(Tanzania Manufacturing)",
        "employee_name": r"Name[^\w]*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)",
        "designation": r"Designation[^\w]*([A-Z\s]+)",
        "basic_salary": r"(?:Basie|Basic)\s+Salary[^\d]*([\d,\.]+)",
        "total_earnings": r"Total\s+Earnings[^\d]*([\d,\.]+)",
        "total_deductions": r"Total\s+Deductions[^\d]*([\d,\.]+)",
        "net_pay": r"Net\s+Pay.*?([\d,\.]+)",
        "bank_account": r"Bank\s+Account\s+Number[^\d]*([\d\-]+)",
        "nssf_number": r"NSSF\s+Number[^\d]*([\d]+)"
    }

    extracted = {}
    for key, pattern in patterns.items():
        match = re.search(pattern, text, re.IGNORECASE)
        extracted[key] = match.group(1).strip() if match else None

    return extracted

if __name__ == "__main__":
    image_path = "sample_payslip.png"
    data = extract_payslip_data(image_path)
    print("\n=== EXTRACTED DATA ===")
    for key, value in data.items():
        print(f"{key}: {value}")
