class WageSubmission:
    response_counter = 1  # global counter for responses
    submissions = {}
    user_registry = {}
    location_track_wages = {}
    allowed_industries = ["agriculture", "fishing and aquaculture", "mining and quarrying", "tourism and hospitality", "forestry and wood processing", "construction and real estate", "manufacturing", "retail and wholesale trade", "transportation and logistics", "financial services", "healthcare and pharmaceuticals", "education and training", "energy and utilities", "telecommunications and ict", "public administration and social services"]
    industry_track_wages = {item: [] for item in allowed_industries}
    # maps state_id -> list of responses

    def __init__(self, state_id, industry, job_title, company, experience_years, wage, location):
        """
        Initialize a wage submission.

        Args:
            state_id (int): Unique state ID of the user (assigned externally).
            industry (str): Industry name (must be in allowed_industries).
            job_title (str): Job title of the user.
            company (str): Optional company name.
            experience_years (int): Number of years of experience.
            wage (float): Reported wage in TZS.
            location (str): Geographic location of the user.
        """
        self.state_id = state_id  # assigned externally by you
        self.response_id = WageSubmission.response_counter
        self.industry = industry.strip().lower()
        self.job_title = job_title.strip()
        self.company = company.strip()
        self.experience_years = experience_years
        self.wage = wage
        self.location = location.strip().lower()

        

    def validate_input(self):
        """
        Validate submission fields and update global trackers.
        Returns:
            bool: True if input is valid, False otherwise.
        """
        try:
            if self.industry not in WageSubmission.allowed_industries:
                raise ValueError(f"Invalid industry! Choose from: {WageSubmission.allowed_industries}")
            if not isinstance(self.job_title, str) or not self.job_title.strip():
                raise ValueError("Job title must be a non-empty string")
            if not isinstance(self.experience_years, int) or self.experience_years < 0:
                raise ValueError("Experience years must be a non-negative integer")
            if not isinstance(self.wage, (int, float)) or self.wage <= 0:
                raise ValueError("Wage must be a positive number")
            if not isinstance(self.location, str) or not self.location.strip():
                raise ValueError("Location must be a non-empty string")
            
            # Register the submission
            WageSubmission.submissions.setdefault(self.state_id, []).append(self)

            if self.state_id not in WageSubmission.user_registry:
                WageSubmission.user_registry[self.state_id] = []
            WageSubmission.user_registry[self.state_id].append(self.response_id)
            
            WageSubmission.response_counter += 1
            
            if self.location not in WageSubmission.location_track_wages:
                WageSubmission.location_track_wages[self.location] = []
            WageSubmission.location_track_wages[self.location].append(self.wage)
            
            WageSubmission.industry_track_wages[self.industry].append(self.wage)
            
            return True

        except ValueError as e:
            print(f" Input Error: {e}")
            return False

    def to_dict(self):
        """Convert submission to dictionary for storage or analysis"""
        return {
            "state_id": self.state_id,
            "response_id": self.response_id,
            "industry": self.industry,
            "job_title": self.job_title,
            "company": self.company,
            "experience_years": self.experience_years,
            "wage": self.wage,
            "location": self.location
        }
    
    @staticmethod
    def calculate_average_wage(category, key):
        """
        Calculate the average wage by industry or location.

        Args:
            category (str): Either "industry" or "location".
            key (str): The specific industry or location to calculate for.

        Returns:
            float: Average wage for the category key.
        """
        
        try:
            if category == "industry":
                wages = WageSubmission.industry_track_wages.get(key, [])
            elif category == "location":
                wages = WageSubmission.location_track_wages.get(key, [])
            else:
                raise ValueError("Category must be 'industry' or 'location'.")

            if not wages:
                raise ValueError(f"No wage data found for {key} in {category}.")

            return sum(wages) / len(wages)

        except ValueError as e:
            print(f"Calculation Error: {e}")
            return None
        
    @staticmethod    
    def benchmark_comparison(submission):
        """
        Compare submission wage to the average wage in the same industry.

        Args:
            submission (WageSubmission): The submission to compare.

        Returns:
            str: "Below Average", "At Average", or "Above Average".
        """
        wages = WageSubmission.industry_track_wages.get(submission.industry, [])
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




# function to get user input and instantiate Wage submission class
def get_user_input():
    while True:  # keep looping until valid
        try:
            state_id = int(input("Enter your State ID: "))
            industry = input(f"Enter your industry {WageSubmission.allowed_industries}: ")
            job_title = input("Enter your job title: ")
            company = input("Enter your company (optional): ")
            experience_years = int(input("Enter your years of experience: "))
            wage = float(input("Enter your wage in TZS: "))
            location = input("Enter your location: ")

            submission = WageSubmission(state_id, industry, job_title, company, experience_years, wage, location)

            #  Run validation
            if submission.validate_input():
                print(f" Submission accepted! Response ID: {submission.response_id}\n")
                comparison = WageSubmission.benchmark_comparison(submission)
                print(f" Your wage is {comparison} compared to the industry average.\n")
                while True:    
                    user_input = input("Do you want to return to the main menu: y/n \n")
                    if user_input == "y": 
                        return main_menu()
                    elif user_input == "n":
                        print("Exiting FairPay Tanzania. Goodbye!")
                        return None
                    else:
                        print("invalid input \n")    

            else:
                print(" Please try again with valid inputs.\n")

        except ValueError:
            print(" Invalid type! Make sure numbers are entered for State ID, years of experience, and wage.\n")


def main_menu():
    """CLI for FairPay Tanzania."""
   

    while True:
        print("\n--- FairPay Tanzania ---")
        print("1) Submit wages")
        print("2) See your submissions")
        print("3) See average wages by industry")
        print("4) See average wages by location")
        print("5) Exit")

        choice = input("Enter your choice (1-5): ").strip()

        if choice == "1":
            try:
                state_id = int(input("Enter your State ID: "))
                industry = input(f"Enter your industry {WageSubmission.allowed_industries}: ").strip()
                job_title = input("Enter your job title: ").strip()
                company = input("Enter your company (optional): ").strip()
                experience_years = int(input("Enter your years of experience: "))
                wage = float(input("Enter your wage in TZS: "))
                location = input("Enter your location: ").strip()

                submission = WageSubmission(
                    state_id, industry, job_title, company, experience_years, wage, location
                )

                if submission.validate_input():
                    print(f" Submission accepted! Response ID: {submission.response_id}\n")
                    comparison = WageSubmission.benchmark_comparison(submission)
                    print(f"  Your wage is {comparison} compared to the industry average.\n")
                else:
                    print(" Please try again with valid inputs.\n")

            except ValueError:
                print(" Invalid input! Use numbers for State ID, years of experience, and wage.\n")

        elif choice == "2":
            try:
                state_id = int(input("Enter your State ID to see your submissions: "))
                if state_id in WageSubmission.submissions:
                    print(" Your submissions:")
                    for sub in WageSubmission.submissions[state_id]:
                        print(sub.to_dict())
                else:
                    print(" No submission found for that State ID.")
            except ValueError:
                print(" Invalid State ID!")

        elif choice == "3":
            industry = input("Enter the industry to check average wage: ").strip().lower()
            avg = WageSubmission.calculate_average_wage("industry", industry)
            if avg is not None:
                print(f"  Average wage in {industry}: {avg:.2f} TZS")

        elif choice == "4":
            location = input("Enter the location to check average wage: ").strip().lower()
            avg = WageSubmission.calculate_average_wage("location", location)
            if avg is not None:
                print(f" Average wage in {location}: {avg:.2f} TZS")

        elif choice == "5":
            print("Exiting FairPay Tanzania. Goodbye!")
            break

        else:
            print(" Invalid choice! Please select a number between 1–5.")