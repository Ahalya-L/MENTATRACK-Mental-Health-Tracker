import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Res.css';

const Res = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="dashboard-nav">
        <div className="logo-container">
          <img src={process.env.PUBLIC_URL + '/Screenshot.jpg'} alt="Website Logo" className="logo" />
          <span className="site-name">MENTATRACK</span>
        </div>
        <ul>
          
        <li><a href="#login">      </a></li>
        
        <li><a href="#login">      </a></li>
        <li><a href="#login" onClick={handleLoginClick}>LOGIN <i className="fas fa-user"></i></a></li>
        </ul>
      </nav>

      {/* Resources Section */}
      <div className="resources-container">
        <h1>Educational Resources</h1>

        {/* Articles Section */}
        <div className="resource-section">
          <h2>Articles</h2>
          <div className="card-container">
            <div className="card">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv24H6OzehU2UmbXk6Ys-4nKtzgzvbvqCmBw&s" alt="Understanding Anxiety" />
              <div className="card-content">
                <h3>Understanding Anxiety</h3>
                <a href="https://www.mayoclinic.org/diseases-conditions/anxiety/symptoms-causes/syc-20350961" target="_blank" rel="noopener noreferrer">
                  Read Article
                </a>
              </div>
            </div>
            <div className="card">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXezVMNnwystHugpTguEFido9_jNc-U6K5ag&s" alt="Managing Stress Effectively" />
              <div className="card-content">
                <h3>Managing Stress Effectively</h3>
                <a href="https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/stress-relief/art-20044456" target="_blank" rel="noopener noreferrer">
                  Read Article
                </a>
              </div>
            </div>
            <div className="card">
              <img src="https://www.tulasihealthcare.com/wp-content/uploads/2023/01/Imp-mental-health-scaled.webp" alt="Mental Health and Mindfulness" />
              <div className="card-content">
                <h3>Mental Health and Mindfulness</h3>
                <a href="https://genesight.com/blog/patient/the-power-of-mindfulness-in-mental-health/?utm_source=google&utm_medium=cpc&utm_campaign=performance-max&utm_content=&utm_term=&gad_source=1&gclid=CjwKCAjw0aS3BhA3EiwAKaDA2ZQcGAquYAz3F6W_kGZ2kVET2lJMLGERCjTfwNeOpFTYCjfGBzVYOMDRoCYMIQAvD_BwE" target="_blank" rel="noopener noreferrer">
                  Read Article
                </a>
              </div>
            </div>
            <div className="card">
            <img src="https://reallifecounseling.us/hubfs/A%20paper%20cutout%20of%20a%20persons%20head%20with%20the%20brain%20drawn%20in%20the%20center%20with%20the%20words%20mental%20health%20written%20inside.%20Other%20words%20such%20as%20hope%2C%20positive%2C%20mood%2C%20love%2C%20and%20control%20are%20written%20in%20cursive%20in%20various%20bright%20colors.png" alt="Coping Strategies for Depression" />
            <div className="card-content">
              <h3>Coping Strategies for Depression</h3>
              <a href="https://www.choosingtherapy.com/coping-skills-for-depression/" target="_blank" rel="noopener noreferrer">
                Read Article
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIGr1baQU7jkJuLsruE6hQkg_PThDSM0nc7w&s" alt="Balancing Stress in the Workplace" />
            <div className="card-content">
              <h3>Balancing Stress in the Workplace</h3>
              <a href="https://positivepsychology.com/workplace-stress-management/" target="_blank" rel="noopener noreferrer">
                Read Article
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6ySc4hiJ5AKkXSBYS2BAyRifPpnA1oZgiWA&s" alt="Managing Anxiety: Techniques to Stay Calm" />
            <div className="card-content">
              <h3>Managing Anxiety:Techniques to Stay Calm</h3>
              <a href="https://www.verywellhealth.com/how-to-deal-with-anxiety-8384822" target="_blank" rel="noopener noreferrer">
                Read Article
              </a>
            </div>
          </div>

          {/* New 10 cards */}
          <div className="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQEsnaEWIiByiBX4ehfrtPXCeRIvjqU8-PnrN77CiBTk3wGj0aNpKR5-tKn7XRyS6YIyU&usqp=CAU" alt="Mindfulness Meditation" />
            <div className="card-content">
              <h3>Importance of Mental Health Awareness</h3>
              <a href="https://mentalhealthyfit.org/facts?gad_source=1&gclid=CjwKCAjwvKi4BhABEiwAH2gcw3uDmpKjuc-6869TKKzoMt_niLqrOLpfTEBapFTLTYhOv79ElC_HnxoCO1YQAvD_BwE
 " target="_blank" rel="noopener noreferrer">
                Read Article
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://es.olaplex.com/cdn/shop/articles/Mental_Health_Blog_Cover.png?v=1652196374&width=1080" alt="The Power of Mindfulness" />
            <div className="card-content">
              <h3>Strategies for Mental Well-Being</h3>
              <a href="https://www.helpguide.org/mental-health/wellbeing/self-care-tips-to-prioritize-your-mental-health" target="_blank" rel="noopener noreferrer">
                Read Article
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://www.shutterstock.com/image-vector/teenagers-problems-unhappy-guys-girls-600nw-2082559732.jpg" alt="Mental Health Benefits of Art" />
            <div className="card-content">
              <h3>Prevention and Management of Mental Health Issues in Adolescents </h3>
              <a href="https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health" target="_blank" rel="noopener noreferrer">
                Read Article
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUy5_a-xcO0hZL9zmfHQEdCAcbn4Te4N8e1w&s" alt="Art Therapy and Mental Health" />
            <div className="card-content">
              <h3>Men’s Mental Health and Emotional Well-Being </h3>
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4907547/" target="_blank" rel="noopener noreferrer">
                Read Article
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://www.usatoday.com/gcdn/authoring/authoring-images/2023/11/13/USAT/71567738007-getty-images-1468853933.jpg?crop=2120,1193,x0,y0&width=660&height=371&format=pjpg&auto=webp" alt="Mental Health and Exercise" />
            <div className="card-content">
              <h3>The Link Between Seasonal Affective
                 Disorder and Depression </h3>
              <a href="https://www.nimh.nih.gov/health/publications/seasonal-affective-disorder#:~:text=People%20with%20winter%2Dpattern%20SAD%20produce%20too%20much%20melatonin%2C%20which,and%20leading%20to%20depression%20symptoms" target="_blank" rel="noopener noreferrer">
                Read Article
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-TK-bhvvRJLzUGPoKzL-_q8NfFyGjWVmD1NRHBqQQCNP8Rw0gyenN9vw3-7sgAHe5yuQ&usqp=CAU" alt="Mindfulness and Mental Health" />
            <div className="card-content">
              <h3> Importance in Postpartum Care</h3>
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2736559/" target="_blank" rel="noopener noreferrer">
                Read Article
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://thumbs.dreamstime.com/b/tired-businessman-suffering-work-stress-wasted-worried-busy-office-late-night-laptop-computer-young-business-77762424.jpg" alt="Mindfulness Practices" />
            <div className="card-content">
              <h3>Managing Anxiety in the Workplace</h3>
              <a href="https://www.healthline.com/health/anxiety/workplace-anxiety#is-it-an-anxiety-disorder" target="_blank" rel="noopener noreferrer">
                Read Article
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://www.drnehagupta.com/wp-content/uploads/2023/01/employees-social-media-moblobi-1024x472-1.png" alt="Mindfulness Techniques" />
            <div className="card-content">
              <h3>The Effects of Social Media on Mental Health </h3>
              <a href="
https://www.helpguide.org/mental-health/wellbeing/social-media-and-mental-health" target="_blank" rel="noopener noreferrer">
                Read Article
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=389x1024:format=jpg/path/sd5a816d339187ebe/image/i8125878156473c67/version/1542135636/image.jpg" alt="Mindfulness in Therapy" />
            <div className="card-content">
              <h3>The Role of Family in Mental Health Support</h3>
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8611594/" target="_blank" rel="noopener noreferrer">
                Read Article
              </a>
            </div>
          </div>
       
          </div>
        </div>

        {/* Videos Section */}
        <div className="resource-section">
          <h2>Videos</h2>
          <div className="card-container">
            <div className="card">
              <img src=" https://www.shutterstock.com/image-photo/good-health-life-260nw-241729210.jpg" alt="How to Manage Anxiety and Depression" />
              <div className="card-content">
                <h3>How to Manage Anxiety and Depression</h3>
                <a href="https://www.youtube.com/watch?v=NHf56w1AmPw" target="_blank" rel="noopener noreferrer">
                  Watch Video
                </a>
              </div>
            </div>
            <div className="card">
              <img src="https://img.youtube.com/vi/RUrpw8RLEDI/0.jpg" alt="Mental Health Awareness" />
              <div className="card-content">
                <h3>Mental Health Awareness</h3>
                <a href="https://www.youtube.com/watch?v=RUrpw8RLEDI" target="_blank" rel="noopener noreferrer">
                  Watch Video
                </a>
              </div>
            </div>
            <div className="card">
              <img src="https://img.youtube.com/vi/rkZl2gsLUp4/0.jpg" alt="Maintaining Mental Well-being" />
              <div className="card-content">
                <h3>Maintaining Mental Well-being</h3>
                <a href="https://www.youtube.com/watch?v=rkZl2gsLUp4" target="_blank" rel="noopener noreferrer">
                  Watch Video
                </a>
              </div>
            </div>

          <div className="card">
            <img src="https://img.youtube.com/vi/B0eu-wF5h2w/0.jpg" alt="Signs of Good Mental Health" />
            <div className="card-content">
              <h3>Signs of Good Mental Health</h3>
              <a href="https://youtu.be/B0eu-wF5h2w?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://img.youtube.com/vi/X7PoKR7jnpY/0.jpg" alt="How to Keep PMS Under Control" />
            <div className="card-content">
              <h3>How to Keep PMS Under Control</h3>
              <a href="https://youtu.be/X7PoKR7jnpY?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://img.youtube.com/vi/Wh5HyJ1rxzk/0.jpg" alt="Tips for Managing Stress" />
            <div className="card-content">
              <h3>Tips for Managing Stress</h3>
              <a href="https://youtu.be/Wh5HyJ1rxzk?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://img.youtube.com/vi/BEhksY-DO1o/0.jpg" alt="Work Life Balance" />
            <div className="card-content">
              <h3>Work Life Balance</h3>
              <a href="https://youtu.be/BEhksY-DO1o?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://img.youtube.com/vi/uQCANEqEeHM/0.jpg" alt="Link Between Sleep Problems And Mental Health?" />
            <div className="card-content">
              <h3>Link Between Sleep Problems And Mental Health?</h3>
              <a href="https://youtu.be/uQCANEqEeHM?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>

          {/* New 8 cards */}
          <div className="card">
            <img src="https://kidshelpline.com.au/sites/default/files/bdl_image/loneliness.gif" alt="Effective Meditation Techniques" />
            <div className="card-content">
              <h3>Coping with Loneliness</h3>
              <a href="https://youtu.be/kWcQyEHRudE?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT94KER2YAFFoLVvKEA55mWk5Kuty-npZ5wLA&s" alt="Overcoming Stress Through Exercise" />
            <div className="card-content">
              <h3>Mental Health in Older Adults</h3>
              <a href="https://youtu.be/hufwCeB1vJ0?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://www.emoneeds.com/wp-content/uploads/2024/05/Addressing-Perinatal-Mental-Health-.webp" alt="Cognitive Behavioral Therapy" />
            <div className="card-content">
              <h3>Addressing perinatal mental health</h3>
              <a href="https://youtu.be/fIJJzijiPTs?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://workscounselingcenter.com/wp-content/uploads/2023/07/The-Impact-of-Exercise-On-Your-Mental-Health-.jpg" alt="Maintaining Good Mental Health" />
            <div className="card-content">
              <h3>
              The Positive Impact Of Exercise On Mental Health</h3>
              <a href="https://youtu.be/fRDccGSLE9k?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSGHfBMAEBwg57DVYTuoKDLSLMSzyLoXMEug&s.png" alt="Mindfulness for Stress Reduction" />
            <div className="card-content">
              <h3>Tips to Become Mentally Strong</h3>
              <a href="https://youtu.be/godVDNVWeso?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://images.squarespace-cdn.com/content/v1/5951d340b11be16c108e8553/1582781495568-049W6I0H7QY0IY7GP3S0/Nutrition.png" alt="Understanding Depression" />
            <div className="card-content">
              <h3>Role of Nutrition in Mental Health</h3>
              <a href="https://youtu.be/WuwODdo74Xw?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://acko-cms.ackoassets.com/mental_health_myths_facts_c09328f000.png" alt="Health Myths vs. Facts" />
            <div className="card-content">
              <h3>Mental Health Myths vs. Facts</h3>
              <a href="https://youtu.be/3d-Abndnrtk?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
          <div className="card">
            <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4862sbbKO-Tu_orLWsrx5ayUZCsMXsZKweQ&s" alt="Mental Health in Daily Life" />
            <div className="card-content">
              <h3>How to Support Someone with Depression</h3>
              <a href="https://youtu.be/NdzW13ETK2g?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
          <div className="card">
            <img src=" https://www.shutterstock.com/image-photo/good-health-life-260nw-241729210.jpg" alt="Mental Health in Daily Life" />
            <div className="card-content">
              <h3>Building Healthy Routines for Better Mental Health</h3>
              <a href="https://youtu.be/Y8HIFRPU6pM?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
          <div className="card">
            <img src="https://i.pinimg.com/736x/67/d1/7c/67d17cde79dff5ebf0d8abcdb2eb61b3.jpg" alt="Overcoming Stress Through Exercise" />
            <div className="card-content">
              <h3>When to Seek Professional Help for Mental Health Issues    </h3>
              <a href="https://youtu.be/AqnGLiWt_34?feature=shared" target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
        
          </div>
        </div>
      </div>

      {/* About Us Section (linked from navigation) */}
      
    </div>
  );
};

export default Res;
