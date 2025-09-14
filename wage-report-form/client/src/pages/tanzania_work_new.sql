-- ============================================
-- 1. Employers table
-- ============================================
CREATE TABLE employers (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,       -- person/company name
    loc VARCHAR(150) NOT NULL,        -- precise location (address/area name)
    latitude DECIMAL(9,6) NOT NULL,   -- latitude in decimal degrees
    longitude DECIMAL(9,6) NOT NULL,  -- longitude in decimal degrees
    job VARCHAR(100) NOT NULL,        -- type of work provided
    company TINYINT(1) NOT NULL DEFAULT 0 -- 1 = registered company, 0 = private/small employer
);

-- ============================================
-- 2. Reviews table
-- ============================================
CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    emp_id INT,
    salary DECIMAL(10,2),                       -- salary in TSh thousands
    validated TINYINT(1) NOT NULL DEFAULT 0, -- 1 = validated, 0 = unvalidated
    envir_rating INT CHECK (envir_rating BETWEEN 1 AND 5),
    social_rating INT CHECK (social_rating BETWEEN 1 AND 5),
    FOREIGN KEY (emp_id) REFERENCES employers(emp_id)
);

-- ============================================
-- 3. Employers (20 rows, mixed: households & firms, with coords)
-- Note: latitude/longitude are approximate demo values!
-- ============================================
INSERT INTO employers (name, loc, latitude, longitude, job, company) VALUES
('Mama Rehema Household', 'Sinza, Dar es Salaam', -6.7817194, 39.2231021, 'House Cleaning', 0),
('Baba Juma Family', 'Kimara, Dar es Salaam', -6.8021014, 39.1713325, 'Gardener', 0),
('Neema & Co.', 'Kariakoo, Dar es Salaam', -6.8203761, 39.2749474, 'Small Grocery Stall', 1),
('Mzee Ally', 'Stone Town, Zanzibar', -6.162658, 39.1900121, 'Night Watchman', 0),
('Asha Home', 'Sakina, Arusha', -3.3527984, 36.6612609, 'Childcare', 0),
('Joseph Carpenter', 'Uyole, Mbeya', -8.9171883, 33.5279497, 'Carpentry', 0),
('Mama Riziki', 'Ilala, Dar es Salaam', -6.8274239, 39.2612272, 'Laundry', 0),
('Hamisi Mechanic', 'Igogo, Mwanza', -2.711136, 33.6994025, 'Motorbike Repair', 0),
('Fatuma Family', 'Morogoro Town, Morogoro', -6.8277071, 37.6654229, 'Domestic Worker', 0),
('Mama Sofia Veggies', 'Sokoni One Market, Arusha', -3.36667, 36.68333, 'Vegetable Seller', 0),
('Kilimanjaro Coffee Ltd.', 'Hai District, Kilimanjaro', -3.3330297, 37.1429854, 'Coffee Processing', 1),
('Serengeti Textiles', 'Moshi Industrial Area, Kilimanjaro', -3.3486456, 37.3435249, 'Manufacturing', 1),
('Safari Logistics', 'Sekei Ward, Arusha', -3.3635887, 36.7009128, 'Transport & Logistics', 1),
('East Africa Health Group', 'Oysterbay, Dar es Salaam', -6.7685985, 39.280467, 'Healthcare', 1),
('Green Energy Tanzania', 'Kilombero District, Morogoro', -8.3553067, 36.0747184, 'Renewable Energy', 1),
('Mama Joyce Kiosk', 'Tabata, Dar es Salaam', -6.8301021, 39.225411, 'Food Vendor', 0),
('Ali Barber', 'Makumbusho, Dar es Salaam', -6.78854, 39.2494177, 'Barber', 0),
('Mwajuma Tailor', 'Mwenge, Dar es Salaam', -6.7666642, 39.231338, 'Tailoring', 0),
('Zanzibar Spice Traders', 'Kizimbani, Zanzibar', -5.0553544, 39.7345289, 'Spice Exporter', 1),
('Salim Boda Boda', 'Ubungo Bus Terminal, Dar es Salaam', -6.7918002, 39.2112164, 'Motorcycle Taxi Rider', 0);

-- ============================================
-- 4. Reviews (~100 total)
-- Added salary_validated = 1 for all records
-- ============================================

-- Mama Rehema Household (3 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(1, 80.00, 1, 2, 2),
(1, 100.00, 1, 4, 3),
(1, 90.00, 1, 1, 2);

-- Baba Juma Family (4 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(2, 120.00, 1, 3, 2),
(2, 110.00, 1, 2, 1),
(2, 130.00, 1, 5, 4),
(2, 100.00, 1, 1, 2);

-- Neema & Co. (5 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(3, 60.00, 1, 3, 3),
(3, 55.00, 1, 1, 2),
(3, 65.00, 1, 4, 4),
(3, 70.00, 1, 5, 5),
(3, 50.00, 1, 2, 1);

-- Mzee Ally (3 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(4, 90.00, 1, 2, 2),
(4, 85.00, 1, 1, 1),
(4, 100.00, 1, 3, 2);

-- Asha Home (3 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(5, 150.00, 1, 5, 5),
(5, 140.00, 1, 4, 3),
(5, 160.00, 1, 2, 2);

-- Joseph Carpenter (6 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(6, 300.00, 1, 5, 5),
(6, 280.00, 1, 3, 3),
(6, 320.00, 1, 4, 4),
(6, 310.00, 1, 2, 2),
(6, 290.00, 1, 1, 2),
(6, 330.00, 1, 4, 3);

-- Mama Riziki (3 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(7, 80.00, 1, 2, 2),
(7, 90.00, 1, 4, 4),
(7, 70.00, 1, 1, 1);

-- Hamisi Mechanic (4 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(8, 200.00, 1, 3, 3),
(8, 210.00, 1, 2, 2),
(8, 220.00, 1, 5, 5),
(8, 190.00, 1, 1, 1);

-- Fatuma Family (2 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(9, 100.00, 1, 3, 2),
(9, 95.00, 1, 1, 1);

-- Mama Sofia Veggies (4 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(10, 70.00, 1, 4, 4),
(10, 65.00, 1, 2, 2),
(10, 75.00, 1, 5, 5),
(10, 60.00, 1, 1, 1);

-- Kilimanjaro Coffee Ltd. (10 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(11, 700.00, 1, 4, 4),
(11, 720.00, 1, 5, 5),
(11, 690.00, 1, 3, 3),
(11, 710.00, 1, 2, 2),
(11, 730.00, 1, 1, 1),
(11, 680.00, 1, 4, 4),
(11, 700.00, 1, 3, 3),
(11, 750.00, 1, 5, 4),
(11, 740.00, 1, 2, 2),
(11, 710.00, 1, 1, 1);

-- Serengeti Textiles (8 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(12, 500.00, 1, 3, 3),
(12, 520.00, 1, 2, 2),
(12, 510.00, 1, 1, 1),
(12, 530.00, 1, 5, 5),
(12, 550.00, 1, 4, 4),
(12, 540.00, 1, 3, 3),
(12, 560.00, 1, 2, 2),
(12, 500.00, 1, 1, 1);

-- Safari Logistics (7 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(13, 600.00, 1, 3, 2),
(13, 620.00, 1, 4, 3),
(13, 590.00, 1, 2, 2),
(13, 610.00, 1, 5, 4),
(13, 630.00, 1, 1, 1),
(13, 650.00, 1, 3, 3),
(13, 600.00, 1, 2, 2);

-- East Africa Health Group (9 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(14, 1200.00, 1, 5, 5),
(14, 1180.00, 1, 4, 4),
(14, 1220.00, 1, 3, 3),
(14, 1190.00, 1, 2, 2),
(14, 1210.00, 1, 1, 1),
(14, 1230.00, 1, 5, 5),
(14, 1170.00, 1, 4, 3),
(14, 1200.00, 1, 2, 2),
(14, 1240.00, 1, 1, 1);

-- Green Energy Tanzania (8 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(15, 1000.00, 1, 5, 5),
(15, 980.00, 1, 4, 4),
(15, 1020.00, 1, 3, 3),
(15, 990.00, 1, 2, 2),
(15, 1010.00, 1, 1, 1),
(15, 995.00, 1, 4, 4),
(15, 1005.00, 1, 2, 2),
(15, 1015.00, 1, 1, 1);

-- Mama Joyce Kiosk (3 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(16, 100.00, 1, 2, 2),
(16, 110.00, 1, 4, 4),
(16, 90.00, 1, 1, 1);

-- Ali Barber (2 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(17, 80.00, 1, 3, 3),
(17, 85.00, 1, 1, 2);

-- Mwajuma Tailor (3 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(18, 150.00, 1, 5, 4),
(18, 140.00, 1, 2, 2),
(18, 130.00, 1, 1, 1);

-- Zanzibar Spice Traders (6 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(19, 650.00, 1, 5, 5),
(19, 630.00, 1, 4, 4),
(19, 670.00, 1, 3, 3),
(19, 640.00, 1, 2, 2),
(19, 660.00, 1, 1, 1),
(19, 680.00, 1, 4, 3);

-- Salim Boda Boda (5 reviews)
INSERT INTO reviews (emp_id, salary, validated, envir_rating, social_rating) VALUES
(20, 120.00, 1, 3, 2),
(20, 150.00, 1, 5, 4),
(20, 130.00, 1, 2, 2),
(20, 100.00, 1, 1, 1),
(20, 160.00, 1, 4, 3);
