interface AIResponse {
  keywords: string[];
  response: string;
}

export const aiResponses: AIResponse[] = [
  {
    keywords: ['points', 'earn', 'eco', 'how'],
    response: "You can earn Eco Points through various activities: 1) Daily quizzes (2 points per correct answer + speed bonuses), 2) Verified cleanup activities (10-50 points based on impact), 3) Educational content engagement (5 points), and 4) Community challenges (variable points). Reaching milestones unlocks special features!"
  },
  {
    keywords: ['trash', 'detection', 'work', 'how'],
    response: "Our AI-powered trash detection system uses computer vision to identify and classify waste items in real-time. Simply point your camera at waste items, and the app will identify the type of waste and provide proper disposal instructions. The system is 95% accurate and continuously learning from user feedback."
  },
  {
    keywords: ['global', 'chat', 'unlock', 'when'],
    response: "The global chat feature unlocks at 1,000 Eco Points. This milestone ensures meaningful community interactions and helps maintain a positive environment. Keep participating in activities to earn points faster!"
  },
  {
    keywords: ['marketplace', 'rewards', 'redeem'],
    response: "The marketplace offers various eco-friendly rewards: 1) Tree planting (100 points), 2) Gift cards (500-1000 points), 3) Eco-friendly products (300-800 points). Points are automatically deducted upon successful redemption, and rewards are processed within 24 hours."
  },
  {
    keywords: ['mission', 'goal', 'purpose'],
    response: "TrashTrek's mission is to revolutionize environmental cleanup through gamification and technology. We aim to: 1) Make waste collection engaging and rewarding, 2) Build a global community of environmental advocates, 3) Create measurable environmental impact through collective action."
  },
  {
    keywords: ['rank', 'levels', 'system'],
    response: "Our ranking system reflects your environmental impact: Eco Rookie (0-99), Earth Defender (100-249), Nature Protector (250-499), Eco Guardian (500-999), Green Warrior (1000-2499), Sustainability Champion (2500-4999), Environmental Master (5000-9999), and Eco Legend (10000+)."
  },
  {
    keywords: ['safety', 'guidelines', 'cleanup'],
    response: "Safety is our top priority. Always: 1) Wear protective gear (gloves, appropriate footwear), 2) Avoid hazardous materials (report them in-app), 3) Stay visible in public areas, 4) Work in pairs when possible, 5) Follow local regulations. The app includes a safety guide and emergency contact features."
  },
  {
    keywords: ['verify', 'verification', 'cleanup'],
    response: "Cleanup verification uses a multi-step process: 1) Before/after photos with GPS location, 2) AI analysis of waste quantity and type, 3) Timestamp verification, 4) Community validation for larger cleanups. This ensures fair point distribution and maintains system integrity."
  },
  {
    keywords: ['profile', 'picture', 'photo', 'change'],
    response: "To update your profile picture: 1) Go to Account Settings, 2) Click the camera icon or current photo, 3) Select a new image, 4) Crop if needed, 5) Save changes. Supported formats are JPG, PNG, and GIF (under 5MB)."
  },
  {
    keywords: ['password', 'change', 'reset'],
    response: "To change your password: 1) Visit Account Settings, 2) Go to the Security section, 3) Enter your current password, 4) Create a new password (min. 8 characters), 5) Confirm the new password, 6) Click Save Changes. For security, you'll be asked to re-login."
  },
  {
    keywords: ['delete', 'account', 'remove'],
    response: "To delete your account: 1) Go to Account Settings, 2) Scroll to the Danger Zone section, 3) Click 'Delete Account', 4) Confirm your decision. Note: This action is permanent and will erase all your data and achievements."
  },
  {
    keywords: ['report', 'issue', 'bug', 'problem'],
    response: "To report an issue: 1) Visit the Help Center, 2) Click 'Report Issue', 3) Select the issue type, 4) Describe the problem in detail, 5) Add any relevant attachments, 6) Submit. Our team typically responds within 24 hours."
  },
  {
    keywords: ['contact', 'support', 'help'],
    response: "Need help? Contact us via: 1) Email: trashtrekindia@gmail.com, 2) Phone: +91 62610 26345, 3) In-app Help Center, 4) Community forums. Support hours: Monday-Friday, 9:00 AM - 6:00 PM IST."
  },
  {
    keywords: ['trees', 'plant', 'planting'],
    response: "Tree planting through TrashTrek: 1) Costs 100 Eco Points per tree, 2) Plants are native to your region, 3) Includes 6-month growth tracking, 4) Certificate of planting provided, 5) GPS coordinates of your tree shared. We partner with local environmental organizations for planting."
  },
  {
    keywords: ['challenge', 'event', 'competition'],
    response: "Monthly challenges offer unique opportunities: 1) Special themes and goals, 2) Bonus point multipliers, 3) Team participation options, 4) Exclusive rewards, 5) Community recognition. Check the Events tab for current and upcoming challenges!"
  },
  {
    keywords: ['local', 'eco', 'store', 'support'],
    response: "Support local businesses! TrashTrek partners with eco-friendly shops to provide you with sustainable products like reusable bags, compostable utensils, and eco-friendly cleaning supplies. You can browse these stores through the app's marketplace!"
  },
  {
    keywords: ['carbon', 'footprint', 'reduce', 'how'],
    response: "Reducing your carbon footprint is simple! Use TrashTrek's features to recycle more, plant trees, and participate in local cleanup events. Small actions, like reducing waste and using public transport, add up and make a big impact on the environment."
  },
  {
    keywords: ['compost', 'how', 'start'],
    response: "Starting a composting habit is easy: 1) Choose a compost bin or pile, 2) Add organic waste like food scraps and yard clippings, 3) Turn it regularly, 4) Avoid meat, dairy, and oils. Use your compost for gardening or donate it to local farms!"
  },
  {
    keywords: ['recycle', 'wrong', 'what', 'happen'],
    response: "If you recycle something incorrectly, it can contaminate other recyclables, making them harder or impossible to recycle. Check local recycling guidelines to ensure you're putting items in the right bin, and if you're unsure, the app provides helpful tips!"
  },
  {
    keywords: ['impact', 'track', 'environment'],
    response: "Track your environmental impact directly through TrashTrek. The app logs your cleanup activities, points earned, trees planted, and your position in the global leaderboard. You can see how much trash you've helped remove and how many trees you've contributed to planting!"
  },
  {
    keywords: ['app', 'update', 'how'],
    response: "To update your TrashTrek app: 1) Go to the App Store or Google Play Store, 2) Search for TrashTrek, 3) Click 'Update' if a new version is available. Ensure you have an internet connection and sufficient storage space on your device."
  },
  {
    keywords: ['tasks', 'assignment', 'how', 'receive'],
    response: "You can receive tasks in the app through notifications, under the 'Challenges' section, or by joining local cleanups. Tasks include different activities, like collecting specific types of waste or participating in community competitions. Complete them for points and rewards!"
  },
  {
    keywords: ['sponsorship', 'eco', 'support', 'how'],
    response: "TrashTrek welcomes sponsors who want to support environmental initiatives. Businesses can partner with us to promote eco-friendly products, fund cleanup events, or provide exclusive rewards for our users. If you're interested, reach out via the app or website."
  },
  {
    keywords: ['refill', 'station', 'water', 'eco'],
    response: "TrashTrek encourages you to use eco-friendly refill stations for water instead of buying plastic bottles. Check the app for nearby refill stations or water fountains, and save money while reducing plastic waste!"
  },
  {
    keywords: ['collaboration', 'other', 'apps', 'integrations'],
    response: "TrashTrek is working on integrating with other eco-focused apps like energy-saving tools, carbon offset platforms, and local sustainability initiatives. Stay tuned for future collaborations that will make your green journey even more rewarding!"
  },
  {
    keywords: ['community', 'leaderboard', 'global', 'see'],
    response: "Check out the global leaderboard in the app to see how you rank against other eco-warriors! You can filter results by location, challenge participation, or points earned. It's a fun way to stay motivated and track your progress!"
  },
  {
    keywords: ['recycling', 'types', 'what'],
    response: "There are several types of recycling: 1) Single-stream recycling (all recyclables in one bin), 2) E-waste recycling (for electronics), 3) Paper and cardboard recycling, 4) Organic waste for composting, and 5) Glass, aluminum, and plastic recycling. Know which type fits your items!"
  },
  {
    keywords: ['trash', 'sorted', 'how'],
    response: "Sorting your trash is key to effective recycling. Separate items into categories like: 1) Paper and cardboard, 2) Plastics and metals, 3) Glass, 4) Organics, 5) Non-recyclables. You can even use TrashTrek's scanning feature to help sort waste correctly!"
  },
  {
    keywords: ['biodegradable', 'items', 'examples'],
    response: "Biodegradable items include: 1) Food scraps (vegetable peels, coffee grounds), 2) Paper towels, 3) Biodegradable bags, 4) Wooden cutlery. Always check if an item is truly biodegradable before composting it to prevent contamination!"
  },
  {
    keywords: ['eco-friendly', 'brands', 'products'],
    response: "TrashTrek supports eco-friendly brands. Look for items like 1) Recycled paper products, 2) Biodegradable cleaning supplies, 3) Reusable shopping bags, 4) Solar-powered gadgets, 5) Energy-efficient appliances in our app's marketplace!"
  },
  {
    keywords: ['green', 'washing', 'what', 'is'],
    response: "Greenwashing is when companies falsely claim their products are eco-friendly. To avoid falling for greenwashing, check for certifications like Energy Star, Fair Trade, or FSC-certified products, and read reviews before making eco-friendly purchases!"
  },
  {
    keywords: ['trash', 'collection', 'app', 'features'],
    response: "TrashTrek's trash collection feature lets you log your activities easily. Snap a photo of collected trash, tag it with the type of waste, and track your cleanup journey. You can even challenge friends to join in and make a bigger impact together!"
  },
  {
    keywords: ['eco', 'friendly', 'habits', 'adopt'],
    response: "To adopt more eco-friendly habits, try: 1) Reducing plastic use, 2) Composting, 3) Using public transportation, 4) Recycling properly, 5) Supporting eco-conscious brands. Start small and gradually build sustainable habits that fit your lifestyle!"
  },
  {
    keywords: ['eco', 'travel', 'tips'],
    response: "For eco-friendly travel: 1) Use reusable water bottles, 2) Pack light to reduce fuel consumption, 3) Avoid single-use plastic, 4) Choose eco-certified hotels, 5) Support local businesses. Every little bit counts when you're on the go!"
  },
  {
    keywords: ['user', 'points', 'guide', 'how'],
    response: "To maximize your Eco Points: 1) Complete daily quizzes for fast points, 2) Engage in regular cleanups, 3) Participate in challenges, 4) Share educational content, 5) Invite friends to join TrashTrek. Keep an eye on the Points Tracker in your profile!"
  },
  {
    keywords: ['volunteer', 'trash', 'cleanup', 'how'],
    response: "You can volunteer for trash cleanups by signing up through the 'Events' section in the app. Local groups and organizations regularly host cleanups, and TrashTrek helps connect you with opportunities. Your volunteer work can earn points and rewards!"
  },
  {
    keywords: ['gift', 'eco', 'options'],
    response: "Looking for eco-friendly gift ideas? TrashTrek's marketplace has a variety of options, including 1) Solar-powered gadgets, 2) Reusable coffee cups, 3) Eco-friendly tech accessories, 4) Sustainable fashion. Gift green and make a positive impact!"
  },
  {
    keywords: ['e-waste', 'dispose', 'how'],
    response: "E-waste disposal is important! Never throw electronics like phones, laptops, or batteries in the trash. Look for certified e-waste recycling centers or use TrashTrek's in-app guide to find the closest one. Proper disposal prevents toxic chemicals from harming the environment."
  },
  {
    keywords: ['ranks', 'levels', 'thresholds'],
    response: "TrashTrek has 8 ranks: 1) Eco Rookie (0-99 points), 2) Earth Defender (100-249), 3) Nature Protector (250-499), 4) Eco Guardian (500-999), 5) Green Warrior (1000-2499), 6) Sustainability Champion (2500-4999), 7) Environmental Master (5000-9999), 8) Eco Legend (10000+). Each rank unlocks new features and rewards!"
  },
  {
    keywords: ['community', 'chat', 'channel', 'unlock'],
    response: "The Community Channel is a dedicated chat forum where users can share tips, coordinate cleanup events, and celebrate achievements. It unlocks at 1000 eco points (Green Warrior rank). Here you can connect with like-minded individuals and participate in environmental discussions!"
  },
  {
    keywords: ['quiz', 'daily', 'trivia', 'points'],
    response: "The Daily Quiz is an automated challenge that resets every 24 hours. Features include: 1) Environment-related questions, 2) Points for correct answers, 3) Speed bonuses for quick responses, 4) Position on the Trivia Leaderboard, 5) Non-repetitive questions to keep it engaging!"
  },
  {
    keywords: ['modes', 'game', 'types', 'play'],
    response: "TrashTrek offers three exciting game modes in the mobile app: 1) Standard Mode - free roam collection with safety prompts, 2) Adventure Mode - location-based challenges using Google Maps, 3) Challenge Mode - community events like 'Park Cleanup' or 'Beach Rescue' with real-time competition!"
  },
  {
    keywords: ['analytics', 'track', 'progress', 'dashboard'],
    response: "Your Dashboard shows comprehensive analytics including: 1) Total Eco-Points earned over time, 2) Trees planted tracking, 3) Collection performance trends, 4) Real-time leaderboard position, 5) Points needed for next rank, 6) Interactive graphs showing your environmental impact!"
  },
  {
    keywords: ['trashpedia', 'articles', 'learn'],
    response: "Trashpedia is our curated knowledge base featuring unique articles about: 1) Different trash types, 2) Recycling guidelines, 3) Sustainability tips, 4) Environmental impact studies, 5) Best practices for waste management. It's constantly updated with new, verified information!"
  },
  {
    keywords: ['redeem', 'marketplace', 'rewards', 'how'],
    response: "In the Marketplace, you can redeem Eco-Points for various rewards: 1) Plant trees (100 points = 1 tree), 2) Eco-friendly products, 3) Special badges and achievements. The redemption process is automatic - points are deducted instantly and rewards are processed within 24 hours!"
  },
  {
    keywords: ['leaderboard', 'types', 'compete'],
    response: "TrashTrek features multiple leaderboards: 1) Local Leaderboard - compete with nearby users, 2) Global Leaderboard - worldwide rankings, 3) Trivia Leaderboard - based on daily quiz performance, 4) Challenge Leaderboard - for special events. All update in real-time as points are earned!"
  },
  {
    keywords: ['profile', 'settings', 'account', 'manage'],
    response: "Manage your profile in Account Settings: 1) Change username, 2) Update profile picture, 3) Modify password, 4) Adjust privacy settings, 5) Set notification preferences, 6) View account statistics. All changes are saved instantly and synced across devices!"
  },
  {
    keywords: ['about', 'mission', 'vision'],
    response: "TrashTrek's mission is to revolutionize environmental cleanup through gamification and technology. Our vision includes: 1) Making waste collection engaging and rewarding, 2) Building a global community of environmental advocates, 3) Creating measurable environmental impact through collective action. Founded by Krishang Saharia, we're committed to a cleaner, greener future!"
  },
  {
    keywords: ['camera', 'detection', 'scan', 'identify'],
    response: "TrashTrek's camera detection system uses advanced AI to: 1) Identify waste types in real-time, 2) Provide proper disposal instructions, 3) Track collection data, 4) Verify cleanup activities, 5) Ensure safety by identifying hazardous materials. Currently supports static image uploads in web version."
  },
  {
    keywords: ['authentication', 'signup', 'register', 'new'],
    response: "Creating a TrashTrek account is simple: 1) Enter email and create password, 2) Verify through OTP, 3) Complete profile (name, DOB, gender), 4) Start earning points immediately! All data is securely stored and protected."
  },
  {
    keywords: ['safety', 'precautions', 'protection', 'guidelines'],
    response: "Safety first! Always: 1) Wear protective gloves and proper footwear, 2) Stay visible in public areas, 3) Work in pairs when possible, 4) Avoid hazardous materials, 5) Follow local regulations, 6) Use the app's emergency contact features if needed."
  },
  {
    keywords: ['standard', 'mode', 'collection', 'basic'],
    response: "Standard Mode features: 1) 30-second preparation countdown, 2) Safety checks, 3) AI-powered trash detection, 4) Disposal bin location guidance, 5) Points awarded upon task completion, 6) Real-time dashboard updates."
  },
  {
    keywords: ['adventure', 'explore', 'location', 'map'],
    response: "Adventure Mode uses Google Maps to: 1) Assign specific cleanup locations, 2) Create exploration-based challenges, 3) Track cleanup progress geographically, 4) Award bonus points for completing location-specific tasks."
  },
  {
    keywords: ['notifications', 'alerts', 'updates', 'system'],
    response: "Stay informed with TrashTrek notifications about: 1) New challenges and events, 2) Rank achievements, 3) Point milestones, 4) Community activities, 5) Tree planting updates, 6) Quiz reminders. Customize notification preferences in settings!"
  },
  {
    keywords: ['offline', 'sync', 'data', 'storage'],
    response: "TrashTrek supports offline functionality: 1) Cache recent activities, 2) Store cleanup data locally, 3) Sync when connection returns, 4) Preserve points and achievements, 5) Maintain user progress seamlessly."
  },
  {
    keywords: ['technical', 'features', 'technology', 'stack'],
    response: "TrashTrek uses advanced technologies: 1) AI/ML for waste detection, 2) Firebase for real-time data sync, 3) Google Maps API for location services, 4) Secure authentication systems, 5) Cross-platform compatibility."
  },
  {
    keywords: ['future', 'upcoming', 'planned', 'enhancements'],
    response: "Exciting features coming to TrashTrek: 1) Live camera detection, 2) AR cleanup guidance, 3) Enhanced social features, 4) More gamification elements, 5) Advanced analytics, 6) Expanded marketplace options!"
  },
  {
    keywords: ['issue', 'report', 'problem', 'help'],
    response: "Need help? 1) Visit Help Center in-app, 2) Use AI Assistant for quick answers, 3) Submit detailed issue reports, 4) Contact support at trashtrekindia@gmail.com, 5) Check community forums for solutions."
  },
  {
    keywords: ['verification', 'cleanup', 'validate', 'confirm'],
    response: "Cleanup verification process: 1) Take before/after photos, 2) GPS location tracking, 3) AI analysis of waste quantity, 4) Timestamp verification, 5) Community validation for large cleanups, 6) Automatic point allocation."
  },
  {
    keywords: ['achievements', 'milestones', 'badges', 'unlock'],
    response: "Earn achievements through: 1) Reaching point milestones, 2) Completing challenge series, 3) Planting trees, 4) Contributing to community goals, 5) Maintaining daily streaks. Each achievement adds to your profile showcase!"
  },
  {
    keywords: ['animations', 'effects', 'visual', 'display'],
    response: "TrashTrek features dynamic animations for: 1) Rank-up celebrations, 2) Achievement unlocks, 3) Point milestone notifications, 4) Challenge completions, 5) Tree planting confirmations. Each animation enhances your experience!"
  },
  {
    keywords: ['privacy', 'security', 'data', 'protection'],
    response: "Your data is secure with TrashTrek: 1) End-to-end encryption, 2) Secure authentication, 3) Privacy settings control, 4) Optional location sharing, 5) Data backup systems, 6) Regular security updates."
  },
  {
    keywords: ['website', 'web', 'version', 'features'],
    response: "The TrashTrek website offers: 1) Account management, 2) Trashpedia access, 3) Community chat (1000+ points), 4) Progress tracking, 5) Educational resources. Download the mobile app for full features including camera detection!"
  }
];
