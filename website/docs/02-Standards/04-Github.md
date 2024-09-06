---
sidebar_label: 4. GitHub Usage
---

# GitHub Usage

Standards and best practices for GitHub.

## Repository Structure

Each repository must include the minimum requirement defined in the previous section on [documenting software](/docs/Standards/Software/)


## Task/Issue Management

- Utilize issue templates for bug reports, feature requests, and other common issues
- Apply appropriate labels (e.g., bug, enhancement, documentation)
- Assign issues to relevant team members

## Branching Strategy

The following is a list of our standard branches:

- `main` is for stable production code
- `develop` is the integration branch for new features
- `feature/<name>` for feature branches
- `release/v<version>` for release branches
- `hotfix/<name>` for hotfix branches 

### Branch Lifecycle

1. Creation
   - Use lowercase and hyphens (e.g., `feature/user-authentication`)
   - Include ticket/issue numbers when applicable (e.g., `feature/PROJ-123-user-authentication`)

2. Development
   - Write clear, concise commit messages in present tense (e.g., "Add feature" not "Added feature")
   - Reference issue numbers in commits when applicable

3. Code Review
   - Create a pull request for review
   - Address feedback and make necessary changes

4. Merging
   - Use "Squash and merge" unless otherwise specified
   - Ensure all CI checks pass and required approvals are obtained

5. Cleanup
   - Delete the feature branch after successful merge

## Pull Requests

### Creating a Pull Request

- Provide a clear title and detailed description
- Reference related issues
- Include screenshots or GIFs for UI changes
- Assign reviewers and add appropriate labels

### Using Draft Pull Requests

Draft Pull Requests are an excellent way to document work in progress and facilitate early feedback. Use them to:

- Organize your thoughts and process
- Share early work and ideas with the team
- Get feedback on implementation approaches before finalizing code
- Track progress on long-running features

Guidelines for Draft Pull Requests:

1. Creation:
   - Open a pull request and select "Create draft pull request"
   - Clearly mark the title with [WIP] or [DRAFT] prefix

2. Description:
   - Outline the current state of the work
   - List planned tasks or improvements
   - Highlight areas where feedback is specifically needed

3. Updates:
   - Regularly update the description or provide comments following commits with progress notes
   - Use task lists (- [ ]) to track completion of sub-tasks

4. Collaboration:
   - Encourage early feedback and discussion
   - Use the pull request comments for design discussions

5. Finalization:
   - Complete all planned work and address feedback
   - Update tests and documentation
   - Click "Ready for review" to move out of draft state

An example Draft Pull Request can be seen [here](https://github.com/overture-stack/composer/pull/1)

### Reviewing a Pull Request

- Respond to review requests promptly
- Provide constructive and respectful feedback
- Use GitHub's suggestion feature for minor changes
- Explicitly approve or request changes

### Merging a Pull Request

- Ensure all CI checks pass
- Obtain the required number of approvals
- Use the project's specified merge strategy (Typically squash and merge)
- Delete the source branch after merging if no longer needed

## Security Best Practices

- Never commit sensitive information (use environment variables instead)

## Releases and Tags

- Follow semantic versioning (MAJOR.MINOR.PATCH)
- Create detailed release notes for each version
- Use Git tags to mark release points in the repository

## GitHub Actions
