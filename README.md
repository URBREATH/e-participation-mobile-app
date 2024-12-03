# URBREATH Mobile Application - README

## **Overview**

The URBREATH mobile application is designed to enhance citizen participation and engagement in urban management processes. It integrates with the Decidim API to extract data while also relying on its own backend for additional local functionalities. Built with **React Native**, the app offers a seamless and responsive user experience on both iOS and Android devices. It empowers citizens to propose ideas, report issues, participate in polls, and interact with urban projects and processes in an interactive, location-based environment.

---

### **Why a Mobile App?**
- **Increased Accessibility**: Users can engage with the platform anytime, anywhere, using just their smartphones.
- **Enhanced Engagement**: Features like push notifications and personalized experiences encourage active participation.
- **Real-Time Interaction**: Provides up-to-date information about urban processes, projects, and events.

### **Why React Native?**
- **Cross-Platform Development**: Single codebase for both iOS and Android devices.
- **Performance**: Delivers smooth, responsive apps with a native feel.
- **Advanced Features**: Supports functionalities like geolocation, notifications, and AR.

---

## **Core Functionalities**

### **Interaction with Decidim API**
- `GET` participation processes, assemblies, and their components.
- `POST` proposals, blogs, meetings, debates, and comments.
- `LOGIN` users, set and retrieve tokens.
- `LOGOUT` users by deleting tokens.
- `SIGN UP` new users and `POST` them in Decidim API.

### **Local Backend Integration**
- **GET/POST** proposals and reports for custom workflows.

---

## **App Pages and Components**

### **Main Page**
1. **Search Bar**: Allows users to search content by title or keyword.
2. **NBS Categories**: Informative "burger button" menu for accessing NBS resources.
3. **Main Menu**: Six core buttons, each representing a specific functionality:
    - **News**: Displays the latest content (e.g., new processes, reports, proposals).
    - **Projects**: Lists urban projects with filtering options and on-map view support.
    - **Processes**: Fetches Decidim participation processes, allowing users to engage directly.
    - **Assemblies**: Overviews participatory assemblies with navigation to detailed components.
    - **Proposals**: Enables users to create, view, and interact with proposals (e.g., like, comment, share).
    - **Reports**: Provides a mechanism to report urban issues or invasive species, including photos and details.

4. **Trending Now**: Displays the latest activity for quick access.

### **Footer Menu**
- **Home**: Redirects to the main page.
- **Near Me**: Uses geolocation to display nearby activities, projects, and proposals on a map.
- **Calendar**: Lists upcoming events and meetings (physical and virtual).
- **Polls**: Gathers user feedback for decision-making and scenario planning.

---

## **Data Extraction for Pages**

### **Assemblies**
The **Assemblies** page uses the `fetchAssemblies` function to extract the following data:
- **Title and Subtitle**: Core information describing each assembly.
- **Short Description and Description**: Brief and detailed overviews of the assembly's purpose.
- **Purpose of Action**: Specific goals of the assembly.
- **Composition and Internal Organisation**: Describes how the assembly is structured.
- **Participatory Scope and Structure**: Information on the assembly's geographical and administrative focus.
- **Target**: Audience or group the assembly is addressing.
- **Linked Participatory Spaces**: Connections with other participatory spaces or assemblies.
- **Components**: List of components (e.g., proposals, blogs, meetings) within the assembly.

---

### **Processes**
The **Processes** page uses the `fetchProcesses` function to retrieve:
- **Title and Subtitle**: Main details of the participatory process.
- **Short Description and Description**: Summarizes and elaborates on the process's purpose.
- **Announcement**: Key notifications related to the process.
- **Developer Group**: Organisation or entity managing the process.
- **Meta Scope, Participatory Scope, and Structure**: Geographical and thematic focus areas.
- **Steps**: Milestones or stages in the process.
- **Categories**: Thematic grouping for better navigation.
- **Components**: Participatory tools or mechanisms included in the process (e.g., blogs, proposals, meetings).

---

### **Blogs**
The **Blogs** page uses the `fetchBlogs` function to extract:
- **Blog Components**: Blogs integrated within participatory processes.
- **Posts**:
  - **Title and Body**: Blog post content.
  - **Author**: Information about the creator of the post.
  - **Published Date**: Date the post was published.
  - **Comments**:
    - **Author and Content**: Details about the commenter.
    - **Upvotes and Downvotes**: Engagement metrics for comments.

---

### **Meetings**
The **Meetings** page uses the `fetchMeetings` function to retrieve:
- **Meeting Components**: Meetings included within participatory processes.
- **Details**:
  - **Title and Description**: Overview of the meeting's purpose.
  - **Start and End Times**: Scheduling information.
  - **Address**: Physical location of the meeting.
  - **Online Meeting URL**: Virtual meeting link, if applicable.
  - **Attendee Count**: Number of participants.
  - **Agenda**: Key topics or items for discussion.
  - **Comments**:
    - **Author and Content**: Details about the commenter.
    - **Upvotes and Downvotes**: Engagement metrics for comments.

---

### **Proposals**
The **Proposals** page uses the `fetchProposals` function to extract:
- **Proposal Components**: Proposals linked to participatory processes.
- **Details**:
  - **Title and Body**: Core content of the proposal.
  - **Answer**: Responses or follow-ups to the proposal.
  - **Published Date**: Date the proposal was published.
  - **Vote Count**: Total votes the proposal has received.
  - **Comments**:
    - **Author and Content**: Feedback on the proposal.
    - **Upvotes and Downvotes**: Metrics for the comments.

---

### **Debates**
The **Debates** page uses the `fetchDebates` function to retrieve:
- **Debate Components**: Debates included in participatory processes.
- **Details**:
  - **Title and Description**: Content and purpose of the debate.
  - **Start and End Times**: Timing details.
  - **Instructions**: Guidelines or rules for participating in the debate.
  - **Comments**:
    - **Author and Content**: Participant feedback.
    - **Upvotes and Downvotes**: Engagement metrics for comments.

---

## **Technical Details**

### **Technology Stack**
- **React Native**: For cross-platform development.
- **Expo**: Simplifies development with tools like automatic updates and live previews.
- **Decidim API**: Fetches and submits participatory data.
- **Internal Backend**: Manages local features and user-specific preferences.

---

## **Conclusion**

The URBREATH mobile app is a dynamic e-participation tool designed to fill the gaps in traditional participation platforms. By integrating Decidim’s API and leveraging React Native, the app provides a comprehensive, responsive, and accessible solution for urban engagement. Each feature is carefully designed to meet the needs of both administrators and citizens.