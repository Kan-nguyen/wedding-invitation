# Contributing to Wedding Invitation Website

Thank you for your interest in contributing to this wedding invitation website template! 🎉

## 🤝 How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in [Issues](https://github.com/Kan-nguyen/wedding-invitation/issues)
2. Create a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/device information
   - Screenshots if applicable

### Suggesting Features
1. Check existing [Issues](https://github.com/Kan-nguyen/wedding-invitation/issues) for similar suggestions
2. Create a new feature request with:
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation approach

### Code Contributions

#### Getting Started
1. Fork the repository
2. Clone your fork locally
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly across different browsers/devices
6. Commit with clear messages
7. Push to your fork
8. Create a Pull Request

#### Development Setup
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/wedding-invitation.git
cd wedding-invitation

# Start development server (if available)
python3 dev-tools/dev_server.py
# Or use any static server
python3 -m http.server 8000
```

#### Code Standards
- **HTML**: Use semantic, accessible markup
- **CSS**: Follow BEM methodology, mobile-first approach
- **JavaScript**: Use vanilla JS (ES6+), no external dependencies
- **Images**: Optimize for web (WebP preferred with fallbacks)
- **Responsive**: Test on mobile, tablet, and desktop
- **Performance**: Keep Lighthouse score above 90

#### File Structure
```
├── index.html          # Main HTML file
├── css/style.css       # Main stylesheet
├── js/wedding-fixed.js # Main JavaScript
├── images/             # Image assets
├── music/              # Audio files
├── assets/             # Icons and decorative elements
└── docs/               # Documentation
```

### Pull Request Guidelines

#### Before Submitting
- [ ] Code follows the project style
- [ ] All tests pass (if applicable)
- [ ] Changes are documented
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsiveness tested
- [ ] Performance impact considered

#### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Safari
- [ ] Tested on Firefox
- [ ] Tested on mobile devices
- [ ] Performance impact assessed

## Screenshots
Include before/after screenshots if applicable
```

## 🎨 Design Guidelines

### Visual Consistency
- **Colors**: Use defined color palette in CSS custom properties
- **Typography**: Stick to defined font families
- **Spacing**: Use consistent spacing units
- **Icons**: Maintain consistent icon style

### Accessibility
- Ensure proper contrast ratios
- Add alt text to images
- Use semantic HTML elements
- Test with screen readers
- Ensure keyboard navigation works

### Performance
- Optimize images (compress, use appropriate formats)
- Minimize HTTP requests
- Use efficient CSS selectors
- Avoid large JavaScript bundles
- Test on slow connections

## 🐛 Bug Fixes

### Priority Levels
- **Critical**: Site breaks, major functionality lost
- **High**: Important features don't work properly
- **Medium**: Minor features or visual issues
- **Low**: Enhancement or nice-to-have fixes

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Browser: [e.g., Chrome 90]
- Device: [e.g., iPhone 12]
- Screen size: [e.g., 1920x1080]

**Screenshots**
Add screenshots if applicable
```

## 🚀 Feature Development

### Feature Categories
- **Core Features**: Essential wedding invitation functionality
- **Enhancement**: Improved user experience
- **Integration**: Third-party service integration
- **Accessibility**: Better accessibility support
- **Performance**: Speed and optimization improvements

### Development Process
1. **Planning**: Discuss the feature in an issue first
2. **Implementation**: Create a feature branch
3. **Testing**: Thoroughly test the feature
4. **Documentation**: Update relevant documentation
5. **Review**: Submit PR for code review

## 📱 Testing Guidelines

### Browser Support
- **Required**: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Testing**: Use browser dev tools device simulation

### Test Checklist
- [ ] All interactive elements work
- [ ] Forms submit properly
- [ ] Images load correctly
- [ ] Music plays (with user interaction)
- [ ] Responsive design works on all screen sizes
- [ ] No console errors
- [ ] Accessibility features function

## 💬 Community Guidelines

### Code of Conduct
- Be respectful and constructive
- Help others learn and grow
- Focus on the code, not the person
- Assume positive intent

### Communication
- Use clear, descriptive commit messages
- Comment your code when necessary
- Be patient with review feedback
- Ask questions if something is unclear

## 🙏 Recognition

Contributors will be acknowledged in:
- README.md contributors section
- Release notes for significant contributions
- Special thanks for major features

## 📞 Getting Help

- Check existing [Issues](https://github.com/Kan-nguyen/wedding-invitation/issues)
- Read the [Documentation](./docs/)
- Look at the project [README](./README.md)

---

Thank you for helping make this wedding invitation template better for everyone! ❤️