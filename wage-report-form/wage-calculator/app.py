from flask import Flask, render_template, request

app = Flask(__name__)

# Example local living wage estimates by location
LIVING_WAGE = {
    "dar es salaam": 400,
    "arusha": 350,
    "mwanza": 300,
    "dodoma": 320
}

# Example average sector wages
SECTOR_AVG = {
    "hospitality": 380,
    "tech": 500,
    "construction": 420,
    "other": 350
}

@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    if request.method == "POST":
        try:
            wage = float(request.form.get("wage"))
            location = request.form.get("location", "").strip().lower()
            sector = request.form.get("sector", "").strip().lower()

            living_wage = LIVING_WAGE.get(location, 350)  # default if unknown
            sector_avg = SECTOR_AVG.get(sector, 350)

            diff_living = ((wage - living_wage) / living_wage) * 100
            diff_sector = ((wage - sector_avg) / sector_avg) * 100

            result = {
                "diff_living": diff_living,
                "diff_sector": diff_sector,
                "living_wage": living_wage,
                "sector_avg": sector_avg,
                "location": location.title(),
                "sector": sector.title(),
                "user_wage": wage
            }
        except ValueError:
            result = {"error": "Invalid input. Please enter numeric values for wage."}

    return render_template("index.html", result=result)

if __name__ == "__main__":
    app.run(debug=True)
