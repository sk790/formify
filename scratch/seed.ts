import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const firstForm = await prisma.form.findFirst();
  if (!firstForm) {
    console.log("No forms found in DB. Please log in to the web app and create at least 1 blank form first so I know your userId.");
    return;
  }
  const userId = firstForm.userId;

  const elements = [
    { id: "id-form-header", type: "FormHeaderField", extraAttributes: { title: "Comprehensive Evaluation & Feedback Form", description: "Please take a few moments to fill out this comprehensive form. This form is carefully designed to showcase and rigorously test every single field type available in the Formify application, ranging from simple text inputs to complex grid selections, file uploads, ratings, and multimedia captures. Your detailed input is highly valued and will help us continuously improve the system for all users.", titleFontSize: "text-4xl", descriptionFontSize: "text-lg" } },
    { id: "id-title", type: "TittleField", extraAttributes: { title: "Personal Details" } },
    { id: "id-text", type: "TextField", extraAttributes: { label: "Full Name", helperText: "Enter your full name", required: true, placeholder: "John Doe" } },
    { id: "id-number", type: "NumberField", extraAttributes: { label: "Age", helperText: "Enter your age", required: false, placeholder: "25" } },
    { id: "id-date", type: "DateField", extraAttributes: { label: "Date of Birth", helperText: "", required: true } },
    { id: "id-time", type: "TimeField", extraAttributes: { label: "Preferred Time", helperText: "", required: false } },
    
    { id: "id-separator", type: "SeparatorField", extraAttributes: {} },
    { id: "id-subtitle", type: "SubTittleField", extraAttributes: { title: "Preferences" } },
    { id: "id-radio", type: "RadioField", extraAttributes: { label: "Favorite Color", helperText: "", required: false, options: ["Red", "Green", "Blue"] } },
    { id: "id-select", type: "SelectField", extraAttributes: { label: "Country", helperText: "", required: false, options: ["USA", "India", "UK", "Australia"] } },
    { id: "id-switch", type: "SwitchField", extraAttributes: { label: "Subscribe to Newsletter", helperText: "", required: false } },
    { id: "id-checkbox", type: "CheckBoxField", extraAttributes: { label: "Agree to Terms", helperText: "", required: true } },
    
    { id: "id-spacer", type: "SpacerField", extraAttributes: { height: 20 } },
    { id: "id-paragraph", type: "ParagraphField", extraAttributes: { text: "Please provide feedback in the sections below." } },
    { id: "id-textarea", type: "TextAreaField", extraAttributes: { label: "Comments", helperText: "Any thoughts?", required: false, placeholder: "Type here..." } },
    { id: "id-rating", type: "RatingField", extraAttributes: { label: "Rate your experience", helperText: "", required: false, ratingType: "star", hasCommentField: true } },
    
    { id: "id-checkboxgrid", type: "CheckboxGridField", extraAttributes: { label: "Skills (Checkbox Grid)", helperText: "", required: false, rows: ["Frontend", "Backend"], columns: ["React", "Node", "Python"] } },
    { id: "id-radiogrid", type: "RadioGridField", extraAttributes: { label: "Proficiency (Radio Grid)", helperText: "", required: false, rows: ["JavaScript", "CSS"], columns: ["Beginner", "Expert"] } },

    { id: "id-upload", type: "UploadField", extraAttributes: { label: "Upload ID", helperText: "Max 5MB", required: false, allowedFileTypes: ["*/*"], maxFileSize: 5 } },
    { id: "id-location", type: "LocationField", extraAttributes: { label: "Your Location", helperText: "", required: false } },
    { id: "id-camera", type: "CameraField", extraAttributes: { label: "Take a selfie", helperText: "", required: false } },
    { id: "id-audio", type: "AudioRecorderField", extraAttributes: { label: "Voice note", helperText: "", required: false } },
    { id: "id-signature", type: "SignatureField", extraAttributes: { label: "Sign here", helperText: "", required: false } },
  ];

  const content = JSON.stringify(elements);
  
  // Check if form already exists
  let form = await prisma.form.findFirst({
    where: { name: "Comprehensive Evaluation & Feedback Form", userId }
  });

  if (form) {
    console.log("Form already exists, updating...");
    form = await prisma.form.update({
      where: { id: form.id },
      data: { content, published: true }
    });
  } else {
    form = await prisma.form.create({
      data: {
        userId,
        name: "Comprehensive Evaluation & Feedback Form",
        description: "A highly detailed form designed to showcase and rigorously test all 23 available form elements in the Formify application. This includes interactive elements like checkbox/radio grids, comment-enabled ratings, signatures, and media uploads.",
        content,
        published: true,
        shareURL: "ultimate-test-form-v2-" + Date.now()
      }
    });
  }

  const submissionContent = JSON.stringify({
    "id-text": "Saurabh",
    "id-number": "25",
    "id-date": new Date().toISOString(),
    "id-time": "14:30",
    "id-radio": "Red",
    "id-select": "India",
    "id-switch": "true",
    "id-checkbox": "true",
    "id-textarea": "This is an amazing form builder!",
    "id-rating": JSON.stringify({ rating: 5, comment: "Super awesome with comments!" }),
    "id-checkboxgrid": JSON.stringify({ "Frontend": ["React"], "Backend": ["Node", "Python"] }),
    "id-radiogrid": JSON.stringify({ "JavaScript": "Expert", "CSS": "Beginner" }),
    "id-upload": "https://example.com/fake-upload.jpg",
    "id-location": '{"lat":28.6139,"lng":77.2090}',
    "id-camera": "https://example.com/fake-photo.jpg",
    "id-audio": "https://example.com/fake-audio.webm",
    "id-signature": "https://example.com/fake-signature.png"
  });

  await prisma.formSubmissions.create({
    data: {
      formId: form.id,
      content: submissionContent
    }
  });

  await prisma.form.update({
    where: { id: form.id },
    data: { submissions: { increment: 1 }, visits: { increment: 2 } }
  });

  console.log("SUCCESS");
  console.log("Form URL: http://localhost:3000/builder/" + form.id);
  console.log("Submit URL: http://localhost:3000/submit/" + form.shareURL);
}

main().catch(console.error);
