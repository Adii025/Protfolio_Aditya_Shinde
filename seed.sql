-- ========================================
-- SEED DATA — Aditya Shinde's portfolio content
-- Run this in the Supabase SQL Editor AFTER running backup.sql
-- (Project -> SQL Editor -> paste -> Run)
-- ========================================

-- PROJECTS (from resume)
INSERT INTO public.projects (title, description, live_url, github_url, technologies, key_features)
VALUES
(
  'Vani – AI Voice Assistant',
  'A voice-controlled AI assistant built with React and Vite. Uses the Web Speech API for real-time speech recognition and the Speech Synthesis API for natural voice responses, with Google Gemini API integration for context-aware, multi-turn conversations and voice-command-based navigation.',
  'https://drive.google.com/file/d/12SN6PFhYHC4kWE4rjdhsMwmhMhLk_JCI/view?usp=sharing',
  'https://github.com/Adii025',
  ARRAY['React', 'Vite', 'JavaScript', 'Google Gemini API', 'Web Speech API'],
  ARRAY[
    'Real-time speech recognition and natural voice responses',
    'Context-aware conversational AI via Google Gemini API',
    'Voice-command-based navigation (open websites, run tasks)',
    'Deployed and tested on Netlify'
  ]
),
(
  'Autonomous Car System',
  'A self-driving car prototype integrating ultrasonic sensors and an OpenCV-based camera module for obstacle detection. A sensor-fusion algorithm improved collision-avoidance accuracy, and an optimized interrupt-driven sensor-polling loop cut response time significantly.',
  'https://drive.google.com/file/d/1rzWVnK6p_eXbkHrrZ137vBWeXJ9YAeM7/view?usp=sharing',
  'https://github.com/Adii025',
  ARRAY['Arduino', 'Ultrasonic Sensors', 'OpenCV', 'Computer Vision', 'C++'],
  ARRAY[
    '3 ultrasonic sensors + OpenCV camera for obstacle detection within 30cm',
    'Sensor-fusion algorithm improved collision-avoidance accuracy from 70% to 92%',
    'Optimized interrupt-driven polling cut response time from 800ms to 320ms'
  ]
),
(
  'Path Following Robot',
  'An autonomous line-following robot built with 5 IR sensors and an Arduino Uno, with real-time motor control logic written in Embedded C.',
  'https://drive.google.com/file/d/1Uvou0-qUpCOjtdDhVSeI-Y6A_XN4a8Ib/view?usp=sharing',
  'https://github.com/Adii025',
  ARRAY['Arduino', 'IR Sensors', 'Embedded C'],
  ARRAY[
    'Path-tracking accuracy above 90% across 4 test tracks',
    'Real-time motor control logic reduced average path deviation by 35%',
    'Demonstrated at a college technical exhibition'
  ]
);

-- TECH STACK (from resume)
INSERT INTO public.tech_stack (name) VALUES
('Java'),
('Spring Boot'),
('JDBC'),
('Servlets'),
('Hibernate'),
('REST API'),
('JavaScript'),
('React.js'),
('HTML5'),
('CSS3'),
('MySQL'),
('Oracle PL/SQL'),
('Git'),
('GitHub');

-- CERTIFICATES (from resume — titles only; upload images via /admin/certificates
-- or update image_url here once you have hosted certificate images)
INSERT INTO public.certificates (title) VALUES
('Java Full Stack Internship Certificate — QSpiders/JSpiders'),
('Training Certificate: SQL, Web Technology & Core Java — QSpiders'),
('Full Stack Development – Master Course — Great Learning Academy');
