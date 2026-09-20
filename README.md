# CivicAI — AI-Powered Civic Issue Intelligence Platform

CivicAI is a web-based civic issue intelligence platform designed to help citizens report local infrastructure and public-service problems and provide administrators with a centralized system to analyze, prioritize, and track those issues.

The platform analyzes reported civic issues such as potholes, garbage accumulation, streetlight failures, water leakage, road damage, and waterlogging. Each report is evaluated based on severity, safety risk, confidence, and priority, followed by a recommended action.

CivicAI also provides an administrative Command Center where reports can be searched, filtered, monitored, and moved through different resolution stages.

---

## 🚀 Features

### 📝 Civic Issue Reporting

Citizens can submit civic issues with:

- Issue category
- Description
- Location
- Optional image preview

Supported categories include:

- Pothole
- Garbage
- Streetlight
- Water Leakage
- Road Damage
- Waterlogging
- Other

---

### 🤖 Intelligent Issue Analysis

CivicAI analyzes the submitted issue and generates:

- Detected issue category
- Severity
- Safety risk
- Confidence score
- Priority score
- Recommended action
- Reasoning behind the recommendation

The current analysis engine uses a deterministic rule-based approach implemented with JavaScript.

---

### 📊 Priority Scoring

Each civic issue receives a priority score based on its category and description.

High-risk keywords such as:

- Accident
- Danger
- Dangerous
- Injury
- School
- Hospital
- Major
- Large
- Deep
- Blocked

can increase the priority and safety risk of a report.

Reports can ultimately be classified as:

- LOW
- MEDIUM
- HIGH
- CRITICAL

---

### 🗄️ Persistent Report Storage

Reports are stored in a SQLite database through the Flask backend.

Stored information includes:

- Report ID
- Category
- Description
- Location
- Severity
- Safety risk
- Confidence
- Priority score
- Recommended action
- Reasoning
- Status
- Creation timestamp

---

### 📍 Report Tracking

Users can view submitted reports and monitor their current status.

The report workflow is:

```text
Pending
   ↓
Under Review
   ↓
Dispatched
   ↓
Resolved
````

Status changes are stored in SQLite and remain available after refreshing the application.

---

### 🖥️ Administrative Command Center

The Command Center provides an overview of civic reports.

Administrators can:

* View all reports
* Search reports
* Filter by category
* Filter by status
* View priority scores
* Monitor report status
* Update report status
* View total reports
* View critical reports
* View open reports
* View resolved reports

---

## 🛠️ Technology Stack

| Layer                 | Technology |
| --------------------- | ---------- |
| Frontend              | HTML5      |
| Styling               | CSS3       |
| Client-side Logic     | JavaScript |
| Backend               | Python     |
| Web Framework         | Flask      |
| API                   | REST API   |
| Database              | SQLite     |
| Cross-Origin Requests | Flask-CORS |

The project intentionally uses a simple technology stack so that the complete system remains easy to understand, maintain, and extend.

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      Citizen         │
                    │                      │
                    │  Submit Civic Issue  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Frontend        │
                    │                      │
                    │ HTML + CSS + JS       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Analysis Engine    │
                    │                      │
                    │ Issue Detection      │
                    │ Severity             │
                    │ Safety Risk          │
                    │ Priority             │
                    │ Recommendation       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Flask API        │
                    │                      │
                    │ REST Endpoints        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      SQLite          │
                    │                      │
                    │ Civic Issue Reports  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Command Center      │
                    │                      │
                    │ Search               │
                    │ Filters              │
                    │ Statistics           │
                    │ Status Management    │
                    └──────────────────────┘
```

---

## 📂 Project Structure

```text
CivicAI/
│
├── Backend/
│   ├── app.py
│   ├── database.py
│   └── requirements.txt
│
├── Frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── .gitignore
└── README.md
```

### Backend

`app.py`

Contains the Flask application and REST API endpoints for:

* Health checking
* Creating reports
* Retrieving reports
* Updating report status

`database.py`

Handles SQLite database initialization and creation of the reports table.

`requirements.txt`

Contains the Python dependencies required by the backend.

---

### Frontend

`index.html`

Contains the CivicAI user interface and application sections.

`style.css`

Controls the visual design, layout, responsive behavior, dashboard, forms, cards, tables, and status elements.

`script.js`

Handles:

* User interaction
* Issue analysis
* Image preview
* API communication
* Report submission
* Report retrieval
* Search
* Filtering
* Dashboard statistics
* Status updates

---

## 🔌 API Endpoints

### Health Check

```http
GET /api/health
```

Used to verify that the Flask backend is running.

---

### Create Report

```http
POST /api/reports
```

Creates a new civic issue report.

Example request:

```json
{
  "report_id": "REP-ABC123",
  "category": "Pothole",
  "description": "Large pothole near the main road.",
  "location": "Bengaluru",
  "severity": "HIGH",
  "safety_risk": "HIGH",
  "confidence": 91,
  "priority_score": 87,
  "recommended_action": "Inspect the road and repair the pothole.",
  "reasoning": "Road damage can affect vehicle safety."
}
```

---

### Get Reports

```http
GET /api/reports
```

Returns the stored civic issue reports from SQLite.

---

### Update Report Status

```http
PATCH /api/reports/<report_id>/status
```

Updates the status of a report.

Supported statuses:

```text
Pending
Under Review
Dispatched
Resolved
```

---

## 💻 Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/gabbitaumeshchandra/CivicAI.git
```

Move into the project directory:

```bash
cd CivicAI
```

---

### 2. Create a Python virtual environment

Move into the backend directory:

```bash
cd Backend
```

Create the virtual environment:

```bash
python -m venv venv
```

---

### 3. Activate the virtual environment

#### Windows

```bash
venv\Scripts\activate
```

#### macOS / Linux

```bash
source venv/bin/activate
```

---

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

---

### 5. Start the backend

```bash
python app.py
```

The backend will run at:

```text
http://127.0.0.1:5000
```

---

### 6. Open the frontend

Open:

```text
Frontend/index.html
```

in your browser.

Make sure the Flask backend is running before submitting reports.

---

## 🔄 Application Workflow

The basic application workflow is:

```text
1. User opens CivicAI
          ↓
2. User selects an issue category
          ↓
3. User enters description and location
          ↓
4. CivicAI analyzes the issue
          ↓
5. Severity and priority are calculated
          ↓
6. Recommended action is generated
          ↓
7. User submits the report
          ↓
8. Flask API receives the report
          ↓
9. SQLite stores the report
          ↓
10. Report appears in Track Reports
          ↓
11. Administrator opens Command Center
          ↓
12. Administrator searches/filters reports
          ↓
13. Report status is updated
          ↓
14. Status is persisted in SQLite
```

---

## 🧠 Analysis Engine

The current CivicAI analysis engine is a deterministic rule-based system rather than a machine-learning or large-language-model system.

This approach makes the current implementation:

* Easy to understand
* Deterministic
* Easy to test
* Easy to debug
* Easy to explain during technical interviews

For example, a pothole report starts with a predefined priority value. Certain high-risk terms can increase the priority and safety classification.

The system then maps the final priority into a severity level.

```text
Priority >= 90
       ↓
   CRITICAL

Priority >= 75
       ↓
     HIGH

Priority >= 55
       ↓
    MEDIUM

Priority < 55
       ↓
      LOW
```

---

## 📊 Dashboard

The Command Center provides a centralized view of civic reports.

### Dashboard metrics

* Total Reports
* Critical Reports
* Open Reports
* Resolved Reports

### Search

Reports can be searched using:

* Report ID
* Location
* Category
* Status
* Description

### Filters

Reports can be filtered using:

* Category
* Status

Reports are also sorted according to priority so that higher-priority issues appear first.

---

## 🔐 Data & Security Considerations

The frontend escapes report content before inserting it into dynamically generated HTML.

This helps reduce the risk of HTML injection when displaying user-provided report information.

The project also uses `.gitignore` to prevent local development files such as:

```text
venv/
__pycache__/
*.db
```

from being committed to the repository.

---

## 🧪 Testing

The main application flow can be tested using:

```text
Report Issue
      ↓
Analyze
      ↓
Submit
      ↓
Track Reports
      ↓
Command Center
      ↓
Search
      ↓
Filter
      ↓
Update Status
      ↓
Refresh
```

The expected result is that the report and its updated status remain available after refreshing the application.

---

## 🚀 Future Improvements

Potential future versions of CivicAI could include:

* Machine-learning-based issue classification
* Image-based civic issue detection
* Real-time geographic mapping
* Municipal department assignment
* Email notifications
* Mobile application
* Advanced analytics
* Historical trend analysis
* Role-based authentication
* Cloud database
* Real-time administrator notifications
* Citizen feedback after resolution

These are planned possibilities and are not part of the current implementation.

---

## 🎯 Project Goals

CivicAI was designed around three main goals:

### 1. Simplify Civic Issue Reporting

Provide a straightforward way for users to report local problems.

### 2. Prioritize Issues

Use structured analysis to identify issues that may require greater attention based on severity and safety risk.

### 3. Improve Issue Tracking

Provide administrators with a centralized dashboard for monitoring and updating civic reports.

---

## 📌 Current Project Status

```text
Frontend                 ✅ Complete
Backend                  ✅ Complete
REST API                 ✅ Complete
SQLite Database          ✅ Complete
Issue Analysis           ✅ Complete
Priority Scoring        ✅ Complete
Report Tracking          ✅ Complete
Status Management        ✅ Complete
Search                   ✅ Complete
Filtering                ✅ Complete
Command Center           ✅ Complete
```

---

## 👨‍💻 Author

**Umesh Chandra**

Engineering student specializing in Data Science with interests in:

* Python
* Data Science
* Data Analytics
* Web Development
* Artificial Intelligence
* SQL
* Full-Stack Development

---

## 📄 License
This project is available for educational and portfolio purposes.
This project is available for educational and portfolio purposes.

