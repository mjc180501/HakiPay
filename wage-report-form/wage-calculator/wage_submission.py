import csv
import html

class WageSubmission:
    response_counter = 1
    submissions = []

    allowed_industries = [
        "agriculture", "fishing and aquaculture", "mining and quarrying",
        "tourism and hospitality", "forestry and wood processing",
        "construction and real estate", "manufacturing",
        "retail and wholesale trade", "transportation and logistics",
        "financial services", "healthcare and pharmaceuticals",
        "education and training", "energy and utilities",
        "telecommunications and ict", "public administration and social services"
    ]

    def __init__(self, state_id, industry, job_title, company, experience_years, wage, location):
        self.state_id = html.escape(str(state_id))
        self.id = WageSubmission.response_counter
        self.industry = html.escape(industry.strip().lower())
        self.job_title = html.escape(job_title.strip())
        self.company = html.escape(company.strip())
        self.experience_years = int(experience_years)
        self.wage = float(wage)
        self.location = html.escape(location.strip().lower())

        WageSubmission.submissions.append(self)
        WageSubmission.response_counter += 1

    @staticmethod
    def benchmark_comparison(submission):
        wages = [s.wage for s in WageSubmission.submissions if s.industry == submission.industry]
        if not wages:
            return "No data to compare"
        avg = sum(wages) / len(wages)
        percent_diff = ((submission.wage - avg) / avg) * 100
        if submission.wage < avg:
            return f"Below Average by {abs(percent_diff):.2f}%"
        elif submission.wage == avg:
            return "At Average"
        else:
            return f"Above Average by {percent_diff:.2f}%"

    @staticmethod
    def calculate_average(category, key):
        if category == "industry":
            wages = [s.wage for s in WageSubmission.submissions if s.industry == key]
        elif category == "location":
            wages = [s.wage for s in WageSubmission.submissions if s.location == key]
        else:
            return None
        if not wages:
            return None
        return sum(wages) / len(wages)

    @staticmethod
    def percentiles(submission):
        wages = sorted([s.wage for s in WageSubmission.submissions if s.industry == submission.industry])
        if not wages:
            return None

        def percentile(data, perc):
            n = len(data)
            k = (n - 1) * (perc / 100)
            f = int(k)
            c = k - f
            if f + 1 < n:
                return data[f] + (data[f + 1] - data[f]) * c
            return data[f]

        return {
            "p25": percentile(wages, 25),
            "median": percentile(wages, 50),
            "p75": percentile(wages, 75),
            "your_wage": submission.wage
        }

    @staticmethod
    def export_csv(filename="submissions.csv"):
        with open(filename, mode="w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(["ID", "State ID", "Industry", "Job Title", "Company",
                             "Years Exp", "Wage", "Location"])
            for s in WageSubmission.submissions:
                writer.writerow([s.id, s.state_id, s.industry, s.job_title,
                                 s.company, s.experience_years, s.wage, s.location])

