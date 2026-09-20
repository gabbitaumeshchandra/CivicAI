from flask import Flask, jsonify, request
from flask_cors import CORS

from database import create_table, get_connection


app = Flask(__name__)

CORS(app)


# ================= HOME =================

@app.route("/")
def home():

    return jsonify({
        "message": "CivicAI Backend is running!"
    })


# ================= HEALTH =================

@app.route("/api/health")
def health():

    return jsonify({
        "status": "healthy",
        "project": "CivicAI"
    })


# ================= CREATE REPORT =================

@app.route("/api/reports", methods=["POST"])
def create_report():

    data = request.json

    connection = get_connection()

    connection.execute("""
        INSERT INTO reports (
            report_id,
            category,
            description,
            location,
            severity,
            safety_risk,
            confidence,
            priority_score,
            recommended_action,
            reasoning
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (

        data["report_id"],

        data["category"],

        data["description"],

        data["location"],

        data["severity"],

        data["safety_risk"],

        data["confidence"],

        data["priority_score"],

        data["recommended_action"],

        data["reasoning"]

    ))

    connection.commit()

    connection.close()


    return jsonify({

        "message": "Report saved successfully",

        "report_id": data["report_id"]

    }), 201


# ================= GET REPORTS =================

@app.route("/api/reports", methods=["GET"])
def get_reports():

    connection = get_connection()


    reports = connection.execute("""
        SELECT *
        FROM reports
        ORDER BY created_at DESC
    """).fetchall()


    connection.close()


    return jsonify([

        dict(report)

        for report in reports

    ])


# ================= UPDATE REPORT STATUS =================

@app.route(
    "/api/reports/<report_id>/status",
    methods=["PATCH"]
)
def update_report_status(report_id):

    data = request.json

    new_status = data.get("status")


    allowed_statuses = [

        "Pending",

        "Under Review",

        "Dispatched",

        "Resolved"

    ]


    if new_status not in allowed_statuses:

        return jsonify({

            "error": "Invalid status"

        }), 400


    connection = get_connection()


    report = connection.execute(
        """
        SELECT *
        FROM reports
        WHERE report_id = ?
        """,
        (report_id,)
    ).fetchone()


    if report is None:

        connection.close()

        return jsonify({

            "error": "Report not found"

        }), 404


    connection.execute(
        """
        UPDATE reports
        SET status = ?
        WHERE report_id = ?
        """,
        (
            new_status,
            report_id
        )
    )


    connection.commit()

    connection.close()


    return jsonify({

        "message": "Report status updated",

        "report_id": report_id,

        "status": new_status

    })


# ================= DATABASE =================

create_table()


# ================= START SERVER =================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )