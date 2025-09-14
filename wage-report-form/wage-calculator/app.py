from flask import Flask, render_template, request, redirect, send_file
from wage_submission import WageSubmission
import io
import csv

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/submit", methods=["GET", "POST"])
def submit():
    message = None
    comparison = None
    industries = WageSubmission.allowed_industries
    if request.method == "POST":
        try:
            state_id = request.form["state_id"]
            industry = request.form["industry"]
            job_title = request.form["job_title"]
            company = request.form.get("company", "")
            experience_years = request.form["experience_years"]
            wage = request.form["wage"]
            location = request.form["location"]

            submission = WageSubmission(state_id, industry, job_title, company, experience_years, wage, location)
            comparison = WageSubmission.benchmark_comparison(submission)
            message = f"Submission accepted! Response ID: {submission.id}"
        except Exception as e:
            message = f"Error: {str(e)}"
    return render_template("submit.html", industries=industries, message=message, comparison=comparison)

@app.route("/submissions")
def submissions_page():
    return render_template("submissions.html", submissions=WageSubmission.submissions)

@app.route("/export_csv")
def export_csv():
    # Create in-memory CSV
    proxy = io.StringIO()
    writer = csv.writer(proxy)
    writer.writerow(["ID", "State ID", "Industry", "Job Title", "Company",
                     "Years Exp", "Wage", "Location"])
    for s in WageSubmission.submissions:
        writer.writerow([s.id, s.state_id, s.industry, s.job_title,
                         s.company, s.experience_years, s.wage, s.location])
    proxy.seek(0)
    return send_file(io.BytesIO(proxy.getvalue().encode()), as_attachment=True, download_name="submissions.csv", mimetype="text/csv")

@app.route("/average_industry", methods=["GET","POST"])
def average_industry():
    avg = None
    industry = None
    if request.method == "POST":
        industry = request.form.get("industry")
        avg = WageSubmission.calculate_average("industry", industry)
    return render_template("average_industry.html", avg=avg, industry=industry, industries=WageSubmission.allowed_industries)

@app.route("/average_location", methods=["GET","POST"])
def average_location():
    avg = None
    location = None
    if request.method == "POST":
        location = request.form.get("location")
        avg = WageSubmission.calculate_average("location", location)
    return render_template("average_location.html", avg=avg, location=location)

@app.route("/exit")
def exit_page():
    return render_template("exit.html")

if __name__ == "__main__":
    app.run(debug=True)
