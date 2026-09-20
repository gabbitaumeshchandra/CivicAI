/* =====================================================
   CIVICAI
   Frontend Application
   HTML + CSS + JavaScript

   Backend:
   Flask + SQLite
   http://127.0.0.1:5000
   ===================================================== */


/* ================= CONFIGURATION ================= */

const API_BASE_URL = "https://civicai-u7yb.onrender.com";


/* ================= GLOBAL VARIABLES ================= */

let selectedCategory = "";
let currentAnalysis = null;

let dashboardSearch = "";
let dashboardStatusFilter = "All";
let dashboardCategoryFilter = "All";


/* =====================================================
   PAGE NAVIGATION
   ===================================================== */

function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    /* Load reports from database
       when opening Track Reports */

    if (pageId === "track") {

        renderReportsList();

    }


    /* Load reports from database
       when opening Command Center */

    if (pageId === "command") {

        renderReports();

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });
}


/* =====================================================
   CATEGORY SELECTION
   ===================================================== */

function selectCategory(category, button) {

    selectedCategory = category;


    document
        .querySelectorAll(".category-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    if (button) {

        button.classList.add("active");

    }
}


/* =====================================================
   IMAGE PREVIEW
   ===================================================== */

function previewImage(event) {

    const file =
        event.target.files[0];


    const preview =
        document.getElementById(
            "imagePreview"
        );


    if (!file) {

        preview.style.display =
            "none";

        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function (e) {

            preview.src =
                e.target.result;

            preview.style.display =
                "block";

        };


    reader.readAsDataURL(file);
}


/* =====================================================
   ISSUE DETECTION
   ===================================================== */

function detectIssue(text) {

    if (
        text.includes("pothole")
    ) {

        return "Pothole";

    }


    if (
        text.includes("garbage") ||
        text.includes("waste")
    ) {

        return "Garbage";

    }


    if (
        text.includes("streetlight") ||
        text.includes("street light")
    ) {

        return "Streetlight";

    }


    if (
        text.includes("leak") ||
        text.includes("pipe")
    ) {

        return "Water Leakage";

    }


    if (
        text.includes("flood") ||
        text.includes("waterlogging")
    ) {

        return "Waterlogging";

    }


    if (
        text.includes("road damage") ||
        text.includes("damaged road")
    ) {

        return "Road Damage";

    }


    return "Other";
}


/* =====================================================
   AI ANALYSIS
   ===================================================== */

function analyzeIssue() {

    const description =
        document
            .getElementById("description")
            .value
            .trim();


    const location =
        document
            .getElementById("location")
            .value
            .trim();


    if (!description) {

        alert(
            "Please describe the issue."
        );

        return;
    }


    if (!location) {

        alert(
            "Please enter the location."
        );

        return;
    }


    const text =
        description.toLowerCase();


    let issue =
        selectedCategory ||
        detectIssue(text);


    let severity =
        "MEDIUM";


    let safetyRisk =
        "MEDIUM";


    let confidence =
        82;


    let priority =
        50;


    let recommendation =
        "Review the reported issue and schedule appropriate action.";


    let reasoning =
        "The issue requires assessment based on its description and location.";


    /* ================= POTHOLE ================= */

    if (
        issue === "Pothole" ||
        text.includes("pothole")
    ) {

        issue =
            "Pothole";


        priority =
            72;


        recommendation =
            "Inspect the road and repair the pothole.";


        reasoning =
            "Road damage can affect vehicle safety and should be assessed for repair.";

    }


    /* ================= GARBAGE ================= */

    else if (
        issue === "Garbage" ||
        text.includes("garbage") ||
        text.includes("waste")
    ) {

        issue =
            "Garbage";


        priority =
            58;


        recommendation =
            "Schedule waste collection and inspect the affected area.";


        reasoning =
            "Accumulated waste can create sanitation concerns if left unresolved.";

    }


    /* ================= STREETLIGHT ================= */

    else if (
        issue === "Streetlight" ||
        text.includes("streetlight") ||
        text.includes("street light")
    ) {

        issue =
            "Streetlight";


        priority =
            67;


        recommendation =
            "Inspect the streetlight and restore proper lighting.";


        reasoning =
            "Poor street lighting can reduce visibility and create safety concerns.";

    }


    /* ================= WATER LEAKAGE ================= */

    else if (
        issue === "Water Leakage" ||
        text.includes("leak") ||
        text.includes("pipe")
    ) {

        issue =
            "Water Leakage";


        priority =
            74;


        recommendation =
            "Inspect the water line and repair the leakage.";


        reasoning =
            "Water leakage can damage surrounding infrastructure and waste water.";

    }


    /* ================= WATERLOGGING ================= */

    else if (
        issue === "Waterlogging" ||
        text.includes("flood") ||
        text.includes("waterlogging")
    ) {

        issue =
            "Waterlogging";


        priority =
            82;


        safetyRisk =
            "HIGH";


        recommendation =
            "Inspect drainage conditions and clear blocked water channels.";


        reasoning =
            "Waterlogging can affect road accessibility, traffic movement and public safety.";

    }


    /* ================= ROAD DAMAGE ================= */

    else if (
        issue === "Road Damage" ||
        text.includes("road damage") ||
        text.includes("damaged road")
    ) {

        issue =
            "Road Damage";


        priority =
            76;


        recommendation =
            "Inspect the damaged road section and schedule repairs.";


        reasoning =
            "Road damage can affect vehicle movement and public safety.";

    }


    /* =================================================
       HIGH-RISK KEYWORDS
       ================================================= */

    const highRiskKeywords = [

        "accident",

        "danger",

        "dangerous",

        "injury",

        "school",

        "hospital",

        "major",

        "large",

        "deep",

        "blocked"

    ];


    const hasHighRiskKeyword =
        highRiskKeywords.some(
            keyword =>
                text.includes(keyword)
        );


    if (hasHighRiskKeyword) {

        priority +=
            15;


        safetyRisk =
            "HIGH";


        severity =
            "HIGH";


        confidence =
            91;

    }


    /* =================================================
       FINAL SEVERITY
       ================================================= */

    if (
        priority >= 90
    ) {

        priority =
            93;


        severity =
            "CRITICAL";


        safetyRisk =
            "HIGH";

    }

    else if (
        priority >= 75
    ) {

        severity =
            "HIGH";

    }

    else if (
        priority >= 55
    ) {

        severity =
            "MEDIUM";

    }

    else {

        severity =
            "LOW";

    }


    /* =================================================
       SAVE ANALYSIS IN MEMORY
       ================================================= */

    currentAnalysis = {

        issue:
            issue,

        severity:
            severity,

        safetyRisk:
            safetyRisk,

        confidence:
            confidence,

        priority:
            priority,

        recommendation:
            recommendation,

        reasoning:
            reasoning,

        description:
            description,

        location:
            location

    };


    displayAnalysis(
        currentAnalysis
    );


    showPage(
        "analysis"
    );
}


/* =====================================================
   DISPLAY ANALYSIS
   ===================================================== */

function displayAnalysis(result) {

    document
        .getElementById(
            "resultIssue"
        )
        .textContent =
            result.issue;


    document
        .getElementById(
            "severityBadge"
        )
        .textContent =
            result.severity;


    document
        .getElementById(
            "severityBadge"
        )
        .className =
            "severity " +
            result.severity.toLowerCase();


    document
        .getElementById(
            "priorityScore"
        )
        .textContent =
            result.priority;


    document
        .getElementById(
            "priorityBar"
        )
        .style.width =
            result.priority + "%";


    document
        .getElementById(
            "safetyRisk"
        )
        .textContent =
            result.safetyRisk;


    document
        .getElementById(
            "confidence"
        )
        .textContent =
            result.confidence + "%";


    document
        .getElementById(
            "recommendation"
        )
        .textContent =
            result.recommendation;


    document
        .getElementById(
            "reasoning"
        )
        .textContent =
            result.reasoning;
}


/* =====================================================
   SAVE REPORT TO FLASK + SQLITE
   ===================================================== */

async function saveReport() {

    if (!currentAnalysis) {

        alert(
            "Please analyze the issue first."
        );

        return;
    }


    const report = {

        report_id:
            "REP-" +
            Math.random()
                .toString(36)
                .substring(2, 9)
                .toUpperCase(),


        category:
            currentAnalysis.issue,


        description:
            currentAnalysis.description,


        location:
            currentAnalysis.location,


        severity:
            currentAnalysis.severity,


        safety_risk:
            currentAnalysis.safetyRisk,


        confidence:
            currentAnalysis.confidence,


        priority_score:
            currentAnalysis.priority,


        recommended_action:
            currentAnalysis.recommendation,


        reasoning:
            currentAnalysis.reasoning

    };


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/api/reports`,
                {

                    method:
                        "POST",


                    headers: {

                        "Content-Type":
                            "application/json"

                    },


                    body:
                        JSON.stringify(
                            report
                        )

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "Failed to save report."
            );

        }


        alert(
            "Report submitted successfully.\n\n" +
            "Report ID: " +
            report.report_id
        );


        /* Clear current analysis */

        currentAnalysis =
            null;


        /* Open Track Reports */

        showPage(
            "track"
        );


    }

    catch (error) {

        console.error(
            "Error saving report:",
            error
        );


        alert(
            "Could not save the report.\n\n" +
            error.message +
            "\n\n" +
            "Make sure the CivicAI Python backend is running."
        );

    }
}


/* =====================================================
   GET ALL REPORTS FROM SQLITE
   ===================================================== */

async function getReportsFromDatabase() {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/api/reports`
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "Failed to load reports."
            );

        }


        return result;

    }

    catch (error) {

        console.error(
            "Error loading reports:",
            error
        );


        return [];

    }
}


/* =====================================================
   CONVERT DATABASE REPORT TO FRONTEND FORMAT
   ===================================================== */

function formatReport(report) {

    return {

        id:
            report.report_id,


        issue:
            report.category,


        description:
            report.description,


        location:
            report.location,


        severity:
            report.severity,


        safetyRisk:
            report.safety_risk,


        confidence:
            report.confidence,


        priority:
            report.priority_score,


        recommendation:
            report.recommended_action,


        reasoning:
            report.reasoning,


        status:
            report.status,


        createdAt:
            report.created_at

    };
}


/* =====================================================
   TRACK REPORTS
   ===================================================== */

async function renderReportsList() {

    const container =
        document.getElementById(
            "reportsList"
        );


    if (!container) {

        return;

    }


    container.innerHTML = `

        <div class="dashboard-card">

            <p style="color:#7f8ca8">

                Loading reports...

            </p>

        </div>

    `;


    const databaseReports =
        await getReportsFromDatabase();


    const reports =
        databaseReports.map(
            formatReport
        );


    if (reports.length === 0) {

        container.innerHTML = `

            <div class="dashboard-card">

                <h3>
                    No reports yet
                </h3>


                <p style="color:#7f8ca8">

                    Submit your first civic issue
                    to start tracking it.

                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        "";


    reports
        .slice()
        .reverse()
        .forEach(
            report => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "report-item";


                item.innerHTML = `

                    <div>

                        <strong>
                            ${escapeHTML(
                                report.issue
                            )}
                        </strong>


                        <p>
                            ${escapeHTML(
                                report.location
                            )}
                        </p>


                        <small>
                            ${escapeHTML(
                                report.id
                            )}
                        </small>

                    </div>


                    <div>

                        <span class="status">

                            ${escapeHTML(
                                report.status
                            )}

                        </span>

                    </div>

                `;


                container.appendChild(
                    item
                );

            }
        );
}


/* =====================================================
   COMMAND CENTER FILTERS
   ===================================================== */

function setupDashboardFilters() {

    const searchInput =
        document.getElementById(
            "searchReports"
        );


    if (!searchInput) {

        return;

    }


    searchInput.placeholder =
        "Search report ID, location, category, status...";


    /* ================= SEARCH ================= */

    if (
        !searchInput.dataset.listenerAdded
    ) {

        searchInput.addEventListener(
            "input",
            () => {

                dashboardSearch =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                renderReports();

            }
        );


        searchInput.dataset.listenerAdded =
            "true";

    }


    const filterContainer =
        searchInput.parentElement;


    if (!filterContainer) {

        return;

    }


    let statusFilter =
        document.getElementById(
            "statusFilter"
        );


    let categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    /* ================= STATUS FILTER ================= */

    if (!statusFilter) {

        statusFilter =
            document.createElement(
                "select"
            );


        statusFilter.id =
            "statusFilter";


        statusFilter.innerHTML = `

            <option value="All">
                All Statuses
            </option>


            <option value="Pending">
                Pending
            </option>


            <option value="Under Review">
                Under Review
            </option>


            <option value="Dispatched">
                Dispatched
            </option>


            <option value="Resolved">
                Resolved
            </option>

        `;


        filterContainer.appendChild(
            statusFilter
        );

    }


    /* ================= CATEGORY FILTER ================= */

    if (!categoryFilter) {

        categoryFilter =
            document.createElement(
                "select"
            );


        categoryFilter.id =
            "categoryFilter";


        categoryFilter.innerHTML = `

            <option value="All">
                All Categories
            </option>


            <option value="Pothole">
                Pothole
            </option>


            <option value="Garbage">
                Garbage
            </option>


            <option value="Streetlight">
                Streetlight
            </option>


            <option value="Water Leakage">
                Water Leakage
            </option>


            <option value="Road Damage">
                Road Damage
            </option>


            <option value="Waterlogging">
                Waterlogging
            </option>


            <option value="Other">
                Other
            </option>

        `;


        filterContainer.appendChild(
            categoryFilter
        );

    }


    /* Restore selected values */

    statusFilter.value =
        dashboardStatusFilter;


    categoryFilter.value =
        dashboardCategoryFilter;


    /* ================= STATUS LISTENER ================= */

    if (
        !statusFilter.dataset.listenerAdded
    ) {

        statusFilter.addEventListener(
            "change",
            () => {

                dashboardStatusFilter =
                    statusFilter.value;


                renderReports();

            }
        );


        statusFilter.dataset.listenerAdded =
            "true";

    }


    /* ================= CATEGORY LISTENER ================= */

    if (
        !categoryFilter.dataset.listenerAdded
    ) {

        categoryFilter.addEventListener(
            "change",
            () => {

                dashboardCategoryFilter =
                    categoryFilter.value;


                renderReports();

            }
        );


        categoryFilter.dataset.listenerAdded =
            "true";

    }
}


/* =====================================================
   APPLY DASHBOARD FILTERS
   ===================================================== */

function filterDashboardReports(
    reports
) {

    return reports.filter(
        report => {

            const matchesSearch =

                !dashboardSearch ||


                report.issue
                    .toLowerCase()
                    .includes(
                        dashboardSearch
                    ) ||


                report.location
                    .toLowerCase()
                    .includes(
                        dashboardSearch
                    ) ||


                report.id
                    .toLowerCase()
                    .includes(
                        dashboardSearch
                    ) ||


                report.status
                    .toLowerCase()
                    .includes(
                        dashboardSearch
                    ) ||


                report.description
                    .toLowerCase()
                    .includes(
                        dashboardSearch
                    );


            const matchesStatus =

                dashboardStatusFilter ===
                    "All" ||

                report.status ===
                    dashboardStatusFilter;


            const matchesCategory =

                dashboardCategoryFilter ===
                    "All" ||

                report.issue ===
                    dashboardCategoryFilter;


            return (

                matchesSearch &&

                matchesStatus &&

                matchesCategory

            );

        }
    );
}


/* =====================================================
   COMMAND CENTER
   ===================================================== */

async function renderReports() {

    const table =
        document.getElementById(
            "reportsTable"
        );


    if (!table) {

        return;

    }


    /* Create search and filter controls */

    setupDashboardFilters();


    table.innerHTML = `

        <tr>

            <td
                colspan="6"
                style="
                    text-align:center;
                    padding:30px;
                "
            >

                Loading reports...

            </td>

        </tr>

    `;


    const databaseReports =
        await getReportsFromDatabase();


    const reports =
        databaseReports.map(
            formatReport
        );


    /* Apply search and filters */

    const filtered =
        filterDashboardReports(
            reports
        );


    /* Statistics always show
       complete database totals */

    updateStatistics(
        reports
    );


    table.innerHTML =
        "";


    if (
        filtered.length === 0
    ) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="
                        text-align:center;
                        padding:30px;
                        color:#7f8ca8;
                    "
                >

                    No reports found
                    matching your filters.

                </td>

            </tr>

        `;

        return;

    }


    /* Sort by highest priority */

    filtered
        .slice()
        .sort(
            (a, b) =>
                b.priority -
                a.priority
        )
        .forEach(
            report => {

                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `

                    <td>

                        ${escapeHTML(
                            report.id
                        )}

                    </td>


                    <td>

                        ${escapeHTML(
                            report.issue
                        )}

                    </td>


                    <td>

                        ${escapeHTML(
                            report.location
                        )}

                    </td>


                    <td>

                        <strong>

                            ${report.priority}

                        </strong>

                    </td>


                    <td>

                        <span class="status">

                            ${escapeHTML(
                                report.status
                            )}

                        </span>

                    </td>


                    <td>

                        <button
                            class="action-btn"
                            onclick="
                                cycleStatus(
                                    '${escapeHTML(
                                        report.id
                                    )}',
                                    '${escapeHTML(
                                        report.status
                                    )}'
                                )
                            "
                        >

                            Update

                        </button>

                    </td>

                `;


                table.appendChild(
                    row
                );

            }
        );
}


/* =====================================================
   STATISTICS
   ===================================================== */

function updateStatistics(
    reports
) {

    const total =
        reports.length;


    const critical =
        reports.filter(
            report =>
                report.severity ===
                "CRITICAL"
        ).length;


    const open =
        reports.filter(
            report =>
                report.status !==
                "Resolved"
        ).length;


    const resolved =
        reports.filter(
            report =>
                report.status ===
                "Resolved"
        ).length;


    const totalElement =
        document.getElementById(
            "totalReports"
        );


    const criticalElement =
        document.getElementById(
            "criticalReports"
        );


    const openElement =
        document.getElementById(
            "openReports"
        );


    const resolvedElement =
        document.getElementById(
            "resolvedReports"
        );


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (criticalElement) {

        criticalElement.textContent =
            critical;

    }


    if (openElement) {

        openElement.textContent =
            open;

    }


    if (resolvedElement) {

        resolvedElement.textContent =
            resolved;

    }
}


/* =====================================================
   UPDATE REPORT STATUS
   ===================================================== */

async function cycleStatus(
    reportId,
    currentStatus
) {

    const statuses = [

        "Pending",

        "Under Review",

        "Dispatched",

        "Resolved"

    ];


    const currentIndex =
        statuses.indexOf(
            currentStatus
        );


    if (
        currentIndex === -1
    ) {

        alert(
            "Invalid current status: " +
            currentStatus
        );

        return;

    }


    const nextIndex =
        (
            currentIndex + 1
        ) %
        statuses.length;


    const nextStatus =
        statuses[nextIndex];


    try {

        console.log(
            "Updating report:",
            reportId
        );


        console.log(
            "Current status:",
            currentStatus
        );


        console.log(
            "New status:",
            nextStatus
        );


        const response =
            await fetch(
                `${API_BASE_URL}/api/reports/${encodeURIComponent(
                    reportId
                )}/status`,
                {

                    method:
                        "PATCH",


                    headers: {

                        "Content-Type":
                            "application/json"

                    },


                    body:
                        JSON.stringify({

                            status:
                                nextStatus

                        })

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error ||
                "Failed to update report status."
            );

        }


        console.log(
            "Status updated successfully:",
            result
        );


        /*
         * Reload directly from SQLite.
         * This guarantees that the UI
         * displays the database value.
         */

        await renderReports();


        /*
         * Also refresh Track Reports
         * if the container exists.
         */

        await renderReportsList();


    }

    catch (error) {

        console.error(
            "Status update error:",
            error
        );


        alert(
            "Could not update the report status.\n\n" +
            error.message
        );

    }
}


/* =====================================================
   SECURITY
   ===================================================== */

function escapeHTML(
    value
) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =====================================================
   INITIALIZATION
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * Load Command Center
         * directly from SQLite.
         */

        renderReports();

    }
);
