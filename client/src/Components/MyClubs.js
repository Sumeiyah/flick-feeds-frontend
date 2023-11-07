import React from 'react';
import styled from 'styled-components';

import MemberAvatar from './tom-morbey-Msaaw6Ncveg-unsplash.jpg';
import ClubAvatar from './tech-daily-PGuCnUzsRSM-unsplash.jpg';

const MyClubsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ClubProfile = styled.div`
  max-width: 75%;
  border: 1px solid #ddd;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
`;

const StyledClubAvatar = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;
`;

const ClubTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const Genre = styled.p`
  font-size: 0.9rem;
  color: #555;
`;

const ClubDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 10px; /* Add margin between description and members */
`;

const MembersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Add gap between members */
  margin-top: 10px;
  align-items: center;
`;

const StyledMemberAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const MemberName = styled.span`
  font-size: 0.9rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const LeaveButton = styled.button`
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const CreateClubButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

function MyClubs() {
  const clubs = [
    {
      name: 'Action Movie Fans Club',
      avatar: ClubAvatar,
      genre: 'Action Films',
      description:
        'For adrenaline junkies who love action-packed movies! Join us to discuss your favorite action films, share recommendations, and connect with fellow action movie enthusiasts.',
      members: [
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
      ],
    },
    {
      name: 'Classic Movie Buffs Club',
      avatar: ClubAvatar,
      genre: 'Classic Films',
      description:
        'A club for those who appreciate the golden era of cinema. Let\'s dive into the timeless classics, from black and white gems to iconic films that have stood the test of time.',
      members: [
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
      ],
    },
    {
      name: 'Sci-Fi Enthusiasts Club',
      avatar: ClubAvatar,
      genre: 'Science Fiction',
      description:
        'Explore the futuristic worlds of science fiction. Discuss the latest sci-fi releases, dive into the depths of space, and ponder the possibilities of the future.',
      members: [
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
        MemberAvatar,
      ],
    },
    
  ];

  return (
    <MyClubsContainer>
      {clubs.map((club, index) => (
        <ClubProfile key={index}>
          <StyledClubAvatar src={club.avatar} alt={`${club.name} Avatar`} />
          <ClubTitle>{club.name}</ClubTitle>
          <Genre>{club.genre}</Genre>
          <ClubDescription>{club.description}</ClubDescription>
          <MembersContainer>
            {club.members.slice(0, 5).map((avatar, index) => (
              <div key={index}>
                <StyledMemberAvatar src={avatar} alt={`Member ${index + 1}`} />
                <MemberName>  Julie</MemberName>
              </div>
            ))}
            {club.members.length > 5 && (
              <MemberName>and {club.members.length - 5} more</MemberName>
            )}
          </MembersContainer>
          <ActionButtons>
            <LeaveButton>Join Club</LeaveButton>
            <CreateClubButton>Leave Club</CreateClubButton>
          </ActionButtons>
        </ClubProfile>
      ))}
    </MyClubsContainer>
  );
}

export default MyClubs;
