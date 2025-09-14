SELECT
    e.emp_id,
    CASE
        WHEN e.company = 1 THEN e.name
        ELSE 'Private employer'
    END AS display_name,
    e.loc,
    e.latitude,
    e.longitude,
    e.job,
    COUNT(r.review_id) AS review_count,
    ROUND(AVG(CASE WHEN r.validated = 1 THEN r.salary END), 2) AS avg_salary,
    ROUND(AVG(r.envir_rating), 2) AS avg_envir_rating,
    ROUND(AVG(r.social_rating), 2) AS avg_social_rating
FROM employers e
LEFT JOIN reviews r ON e.emp_id = r.emp_id
GROUP BY e.emp_id, display_name, e.loc, e.job;
