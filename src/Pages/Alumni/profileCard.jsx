import React from 'react';
import './profileCard.css';
import {
  WebsiteIcon,
  GithubIcon,
  LeetcodeIcon,
  GfgIcon,
  CodeChefIcon,
  LinkedInIcon,
} from './icons';

const ProfileCard = ({ data }) => {
  return (
    <div className="profile-card">
      <div className="card-header">
        <img src={data.profile_pic} alt={`${data.name} Avatar`} className="avatar" />
        <div className="card-title">
          <h3>{data.name}</h3>
          <p>
            {data.current_role} at <span>{data.current_company}</span>
          </p>
        </div>
      </div>
      <div className="domain-badge">{data.domain}</div>
      <div className="card-body">
        <p className="about">{data.about}</p>
      </div>
      <div className="card-footer">
        {data.portfolio && (
          <a href={data.portfolio} target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
            <WebsiteIcon />
          </a>
        )}
        {data.github && (
          <a href={data.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
        )}
        {data.linkedin && (
          <a href={data.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        )}
        {data.leetcode && (
          <a href={data.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
            <LeetcodeIcon />
          </a>
        )}
        {data.gfg && (
          <a href={data.gfg} target="_blank" rel="noopener noreferrer" aria-label="GeeksforGeeks">
            <GfgIcon />
          </a>
        )}
        {data.codechef && (
          <a href={data.codechef} target="_blank" rel="noopener noreferrer" aria-label="CodeChef">
            <CodeChefIcon />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
