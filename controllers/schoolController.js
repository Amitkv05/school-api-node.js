const db = require("../db");


exports.addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || latitude == null || longitude == null) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ message: "Database error" });
        }

        res.json({ message: "School added successfully" });
    });
};

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;

    lat1 = parseFloat(lat1);
    lon1 = parseFloat(lon1);
    lat2 = parseFloat(lat2);
    lon2 = parseFloat(lon2);

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}


exports.listSchools = (req, res) => {
    let { latitude, longitude } = req.query;

    if (latitude == null || longitude == null) {
        return res.status(400).json({ message: "Location required" });
    }

    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    db.query("SELECT * FROM schools", (err, results) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ message: "Database error" });
        }

        const sortedSchools = results.map((school) => {
            const distance = calculateDistance(
                latitude,
                longitude,
                school.latitude,
                school.longitude
            );

            return { ...school, distance: Number(distance.toFixed(2)) };
        })
            .sort((a, b) => a.distance - b.distance);

        res.json(sortedSchools);
    });
};