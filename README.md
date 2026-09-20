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
