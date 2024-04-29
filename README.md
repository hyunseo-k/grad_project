## 같이방구 (Gatchi-Banggu)
_Sungkyunkwan University Dormitory Roommate Matching Service_

"같이방구" is a web-based platform designed to help students at Sungkyunkwan University find roommates who match their personality and lifestyle. This service aims to overcome the limitations of traditional roommate selection methods and improve the dormitory life.

## Feature Summary

- Dormitory Personality Test (Based on MBTI) to Attract Users
- Actual Matching Web Service

## Development Environment

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MySQL

## Database
![Untitled (17)](https://github.com/hyunseo-k/grad_project/assets/79782180/10ee3c95-c165-4537-8aa7-a74f49f7804d)
- There is a one-to-many relationship between `Users` and `Offers`. A `User` can send or receive multiple `Offers`, and the `sender_id` and `receiver_id` fields indicate the sender and receiver of the offer.

## API
![스크린샷 2024-04-24 005550](https://github.com/hyunseo-k/grad_project/assets/79782180/5a8aebe0-c6cd-4c63-ba9d-e53442b2eb14)
- The API design leverages RESTful principles to manage user and offer-related actions such as user registration, login, viewing, and editing of user profiles, as well as searching for users based on certain criteria.

## Screens
![스크린샷 2024-04-24 024454](https://github.com/hyunseo-k/grad_project/assets/79782180/b4214f89-7369-47a6-8f9d-c25626d487da)
1. **MBTI Test Page**: A quiz page to identify the user's personality type.
2. **Sign-Up Page**: A page where users can sign up for the service.
3. **Login Page**: A page where users can log in to the service.
4. **Search Page**: A page where users can search for other users that meet their criteria.
5. **Profile Page**: A page where users can view and edit their profile.
6. **Offer Page**: A page where users can manage offers (send, receive, check matches).

## Installation and Execution Methods

```bash
# Install dependencies
npm install

# Start the server
npm start

# Start the Node.js server
node server.js
```

## How to Contribute

Please send a Pull Request through GitHub or register an issue.

## 라이센스

This project is distributed under the [MIT License](LICENSE).


