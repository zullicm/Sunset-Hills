puts "Seeding Courses..."

#course create template
#Course.create(name: "", difficulty: "", image: "", about: "")

#Course A - GroundHog
Course.create(name: "GroundHog", difficulty: "Beginner", image: "https://www.colinaparkgolf.com/wp-content/uploads/sites/7014/2018/05/course-2.jpg", about: "Welcoming to players of all skills, our GroundHog course is the least challening course we have. Although the course is a bit longer it encourages players to hit the ball straight as there arent nearly as many dog legs. With only a small amount of hasards this course is best for suited for beginners to the game of golf.")

#Course B - Snake
Course.create(name: "Snake", difficulty: "Experienced", image: "https://www.wellsgolfclub.co.uk/images/resources/wells/courseMap3.png", about: "Our snake course isn't something to scoff at! With long drives and a few extra hazards this course will have you testing your golf game. This course is for the more expirenced players looking step away from the 'easier' courses. Now with a few more dogs legs than the GroundHog course, new players may be finding themselves in the 'ruff' more often!")

#Course C - Gator
Course.create(name: "Gator", difficulty: "Pro", image: "https://golf.com/wp-content/uploads/2020/09/winged-foot-course-map-4-1024x576.jpg", about: "The final boss of courses, the Gator course. Here you must exihbit mastery in all assests of your golf game. Multiple sand traps and killer greens will have you wishing you gave yourself more of a handicap. The players daring enough to take on this course should be more than just expirenced at the game of golf, but gifted, and willing to put in the hard work to complete this course.")

puts "Courses Seeded!"

puts "Seeding Instructors..."

#instructor create template
#Instructor.create(name: "", about:"", difficulty: "", price: , image_1: "", image_2: "")

Instructor.create(name: "Tiger Woods", about:"Tiger, being one of the best to every pick up a club, believes in his ability to help anyone take a couple strokes off their golf game.", difficulty: "Any", price: 500, image_1: "https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,dpr_3.0,f_auto,g_face:center,h_350,q_auto,w_280/headshots_08793.png", image_2: "https://www.kernradio.com/wp-content/uploads/sites/48/2022/05/Tiger-Woods-Masters-2022-02.jpg")

Instructor.create(name: "Phil Mickelson", about:"With the nickname 'Lefty' Phil can help just about anyone, but specializes in his ability to help left handed players who are picking up a club for the first time.", difficulty: "Any / Beginner", price: 400, image_1: "https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,dpr_3.0,f_auto,g_face:center,h_350,q_auto,w_280/headshots_01810.png", image_2: "https://i.guim.co.uk/img/media/7f390ecaff76b2ca647e01081bca9fb69871b7e9/0_46_3980_2388/master/3980.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=b2eda6c50e05152b287fd05ae26ed2d0")

Instructor.create(name: "Rory McIlroy", about:"Coming over from the other side of the Atlantic, Rory believes in his ability to help any top ranked player, score better and more consistetly.", difficulty: "Pro", price: 450, image_1: "https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,dpr_3.0,f_auto,g_face:center,h_350,q_auto,w_280/headshots_28237.png", image_2: "https://nypost.com/wp-content/uploads/sites/2/2022/06/rory-mcilroy-4.jpg")

Instructor.create(name: "Rickie Fowler", about:"Although not as storied, a still skillfull Rickey is ready to help beginners and expiernced player alike up their golf game.", difficulty: "Beginner / Intermediate", price: 350, image_1: "https://pga-tour-res.cloudinary.com/image/upload/c_fill,d_headshots_default.png,dpr_3.0,f_auto,g_face:center,h_350,q_auto,w_280/headshots_32102.png", image_2: "https://www.gannett-cdn.com/authoring/2012/05/13/NFTU/ghows-LK-cddb2ecb-98ee-42c0-942b-ef1a877db277-fe7f65b1.jpeg?width=1200&disable=upscale&format=pjpg&auto=webp")

puts "Instructors seeded!"