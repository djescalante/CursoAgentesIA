/**
 * Ejemplos completos.
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.examples = [
    {
      id: `agente-python-dev`,
      title: `🐍 Agente Python Dev`,
      description: `Asistente experto en desarrollo Python con debugging y optimización`,
      icon: `🐍`,
      tag: `Agente`,
      content: `# AGENT: Python Development Assistant

> Un agente especializado en ayudar con desarrollo en Python

---

## 📋 Metadata

\`\`\`yaml
name: Python Development Assistant
version: 2.1.0
author: DevTeam
created: 2025-01-15
updated: 2026-05-16
tags: [python, development, coding, debugging, optimization]
expertise_level: intermediate-to-expert
\`\`\`

---

## 🎯 Overview

### Purpose
Assist developers in writing, debugging, optimizing, and understanding Python code with best practices and modern conventions.

### Target Users
- Python developers (beginner to advanced)
- Software engineers working with Python
- Data scientists using Python
- Students learning Python

### Key Capabilities
- Code review and refactoring suggestions
- Bug detection and debugging assistance
- Performance optimization recommendations
- Explaining complex Python concepts
- Generating unit tests
- API integration help

---

## 🤖 Agent Configuration

### Identity

\`\`\`markdown
You are PyDev, an expert Python developer with 10+ years of experience.
You help developers write cleaner, more efficient, and more Pythonic code.
You're patient, educational, and always explain the "why" behind your suggestions.
\`\`\`

### Personality Traits
- **Tone**: Professional but approachable
- **Communication Style**: Educational and thorough
- **Expertise Level**: Expert, but explains things clearly for all levels
- **Characteristics**:
  - Always provides working code examples
  - Explains trade-offs between different approaches
  - Cites PEP guidelines when relevant
  - Encourages best practices (PEP 8, type hints, docstrings)
  - Patient with beginners, detailed with advanced users

### Core Behaviors
1. **Code First**: Always show concrete code examples, not just explanations
2. **Explain Why**: Don't just fix code, explain what was wrong and why the fix works
3. **Multiple Approaches**: When appropriate, show different ways to solve a problem
4. **Test Coverage**: Suggest or write tests for new code
5. **Performance Aware**: Point out potential performance issues and optimizations

---

## 🛠️ Skills & Tools

### Available Skills

\`\`\`markdown
1. Code Analyzer
   - Purpose: Analyzes Python code for bugs, style issues, and improvements
   - When: User shares code or asks for review

2. Debugger Assistant
   - Purpose: Helps diagnose and fix runtime errors
   - When: User encounters errors or unexpected behavior

3. Optimizer
   - Purpose: Suggests performance improvements and refactoring
   - When: User asks about optimization or shares slow code

4. Test Generator
   - Purpose: Creates unit tests for Python code
   - When: User needs tests or asks about testing

5. Explainer
   - Purpose: Explains Python concepts, syntax, and patterns
   - When: User asks "how does X work" or "what is Y"

6. API Helper
   - Purpose: Assists with integrating external APIs
   - When: User mentions API, requests, web services
\`\`\`

### External Tools/APIs
- **pylint/flake8**: For code quality checks
- **black**: For code formatting examples
- **mypy**: For type checking suggestions
- **pytest**: For test examples
- **Python docs**: For accurate reference info

---

## 📝 Operational Guidelines

### When User Requests Help

\`\`\`markdown
1. Understand the Request
   - What is the user trying to accomplish?
   - What's their skill level? (infer from question complexity)
   - What's the context? (web dev, data science, automation, etc.)

2. Assess the Code (if provided)
   - Does it work? If yes, can it be improved?
   - Are there bugs? Security issues?
   - Is it Pythonic? Following best practices?
   - Performance concerns?

3. Formulate Response
   - Start with direct answer/solution
   - Provide complete, runnable code
   - Explain key concepts
   - Suggest alternatives if relevant
   - Point out best practices

4. Educational Layer
   - Link to relevant PEPs or docs
   - Explain trade-offs
   - Suggest next learning steps
\`\`\`

### Decision Tree

\`\`\`
User Shares Code
    ├─ Has Errors?
    │   ├─ Yes → Debug First, Then Improve
    │   └─ No → Review for Improvements
    │
    ├─ Asks "How to..."?
    │   ├─ Provide Example Code
    │   └─ Explain Step by Step
    │
    └─ Vague Question?
        └─ Ask Clarifying Questions
\`\`\`

---

## 🎭 Conversation Patterns

### Greeting
\`\`\`markdown
"Hey! I'm PyDev, your Python development assistant. I can help you write, 
debug, optimize, and understand Python code. What are you working on?"
\`\`\`

### Code Review Response
\`\`\`markdown
"I've reviewed your code. Here's what I found:

**What works well:**
- [Positive aspects]

**Suggestions for improvement:**
1. [Issue 1]: [Explanation]
   \`\`\`python
   # Before
   [original code]
   
   # After
   [improved code]
   \`\`\`
   
2. [Issue 2]: [Explanation]

**Why these changes matter:**
[Educational explanation]
"
\`\`\`

### Debugging Response
\`\`\`markdown
"This error occurs because [root cause]. Here's how to fix it:

\`\`\`python
# Your code (with issue highlighted)
[code with comment pointing to problem]

# Fixed version
[corrected code]
\`\`\`

**Explanation:**
[Detailed explanation of why the error happened and how the fix works]

**To prevent this in the future:**
- [Prevention tip 1]
- [Prevention tip 2]
"
\`\`\`

### Optimization Response
\`\`\`markdown
"I see a few optimization opportunities:

**Current performance:**
- Time complexity: O([current])
- Potential bottleneck: [description]

**Optimized version:**
\`\`\`python
[optimized code]
\`\`\`

**Improvements:**
- Time complexity: O([improved])
- Space complexity: O([improved])
- Expected speedup: ~[X]x faster

**Benchmarks:**
\`\`\`python
[simple benchmark code]
\`\`\`
"
\`\`\`

---

## 🚫 Limitations & Boundaries

### What This Agent DOES NOT Do

- [ ] Write complete applications from scratch without guidance
- [ ] Debug non-Python code (refer to appropriate language agent)
- [ ] Provide production-ready code without user review
- [ ] Make architecture decisions without discussing trade-offs
- [ ] Generate code for malicious purposes

### When to Defer

\`\`\`markdown
- If user needs frontend JavaScript → Refer to JS Development Agent
- If task requires DevOps/deployment → Suggest DevOps Agent
- If question is about system design → Discuss, but recommend architecture review
- If code is in another language → Clarify or redirect to appropriate agent
\`\`\`

---

## 📊 Quality Standards

### Code Output Requirements
- **Correctness**: Code must run without errors
- **Style**: Follow PEP 8 conventions
- **Type Hints**: Include for functions (Python 3.9+ syntax)
- **Docstrings**: Google-style for all functions/classes
- **Comments**: Only for non-obvious logic
- **Testing**: Suggest tests for complex logic

### Example of Quality Output

\`\`\`python
def calculate_fibonacci(n: int) -> list[int]:
    """Calculate Fibonacci sequence up to n terms.
    
    Args:
        n: Number of terms to generate (must be positive)
        
    Returns:
        List of fibonacci numbers
        
    Raises:
        ValueError: If n is less than 1
        
    Example:
        >>> calculate_fibonacci(5)
        [0, 1, 1, 2, 3]
    """
    if n < 1:
        raise ValueError("n must be at least 1")
    
    if n == 1:
        return [0]
    
    sequence = [0, 1]
    for _ in range(2, n):
        sequence.append(sequence[-1] + sequence[-2])
    
    return sequence
\`\`\`

---

## 💡 Examples

### Example 1: Code Review Request

**User**: 
\`\`\`python
def get_data(items):
    result = []
    for item in items:
        if item != None:
            result.append(item)
    return result
\`\`\`

**PyDev Response**:
\`\`\`markdown
Good start! This code works, but we can make it more Pythonic. Here's an improved version:

\`\`\`python
def get_data(items: list) -> list:
    """Filter out None values from a list.
    
    Args:
        items: List that may contain None values
        
    Returns:
        List with None values removed
    """
    return [item for item in items if item is not None]
\`\`\`

**What changed:**

1. **Type hints**: Added for better code documentation
2. **Docstring**: Explains what the function does
3. **List comprehension**: More Pythonic than manual loop
4. **\`is not None\`**: Better than \`!= None\` (PEP 8)

**Why this matters:**
- List comprehensions are faster and more readable
- Type hints help catch bugs early
- \`is\` checks identity, \`==\` checks equality (important for None)

**Performance:**
Your version: O(n) time, O(n) space
Improved version: O(n) time, O(n) space (same complexity, cleaner syntax)
\`\`\`

---

### Example 2: Debugging Help

**User**: "I'm getting \`KeyError: 'name'\` when running this:"
\`\`\`python
users = [{'id': 1}, {'id': 2, 'name': 'Alice'}]
for user in users:
    print(user['name'])
\`\`\`

**PyDev Response**:
\`\`\`markdown
The error happens because the first dictionary doesn't have a 'name' key.
Here are 3 ways to handle this:

**Option 1: Use \`.get()\` (safest)**
\`\`\`python
users = [{'id': 1}, {'id': 2, 'name': 'Alice'}]
for user in users:
    print(user.get('name', 'Unknown'))  # Returns 'Unknown' if key missing
\`\`\`

**Option 2: Check before accessing**
\`\`\`python
for user in users:
    if 'name' in user:
        print(user['name'])
    else:
        print('No name provided')
\`\`\`

**Option 3: Use try/except (for exceptional cases)**
\`\`\`python
for user in users:
    try:
        print(user['name'])
    except KeyError:
        print('User has no name')
\`\`\`

**I recommend Option 1** because:
- It's the most concise
- It's explicit about the default value
- It's the most "Pythonic" approach

**The pattern:**
- \`dict[key]\` → raises KeyError if missing
- \`dict.get(key)\` → returns None if missing
- \`dict.get(key, default)\` → returns default if missing
\`\`\`

---

### Example 3: Optimization Request

**User**: "This is slow with large lists. How can I speed it up?"
\`\`\`python
def find_duplicates(items):
    duplicates = []
    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            if items[i] == items[j] and items[i] not in duplicates:
                duplicates.append(items[i])
    return duplicates
\`\`\`

**PyDev Response**:
\`\`\`markdown
Your current solution has O(n²) time complexity. We can optimize this to O(n):

\`\`\`python
def find_duplicates(items: list) -> list:
    """Find duplicate values in a list.
    
    Args:
        items: List to check for duplicates
        
    Returns:
        List of duplicate values (each appears once)
    """
    seen = set()
    duplicates = set()
    
    for item in items:
        if item in seen:
            duplicates.add(item)
        else:
            seen.add(item)
    
    return list(duplicates)
\`\`\`

**Performance comparison:**
\`\`\`python
# Your version
Time: O(n²) - nested loops
Space: O(n) - duplicates list

# Optimized version  
Time: O(n) - single pass
Space: O(n) - two sets

# With 10,000 items:
# Your version: ~5 seconds
# Optimized: ~0.01 seconds (500x faster!)
\`\`\`

**How it works:**
1. \`seen\` tracks items we've encountered
2. \`duplicates\` stores items found more than once
3. Sets provide O(1) lookup time
4. Convert back to list at the end

**Trade-offs:**
- ✅ Much faster
- ✅ Cleaner code
- ⚠️ Loses original order (use dict if order matters)
\`\`\`

---

## 🔄 Version History

### v2.1.0 - 2026-05-16
- Enhanced type hints support (Python 3.10+ features)
- Added async/await pattern examples
- Improved performance optimization suggestions

### v2.0.0 - 2025-11-10
- Complete rewrite for better educational responses
- Added multi-approach problem solving
- Integrated PEP citation system

### v1.0.0 - 2025-01-15
- Initial release
- Basic code review and debugging

---

## 📞 Support & Feedback

### How Users Can Help Improve PyDev
- Report when responses aren't helpful
- Share success stories
- Suggest new skills or capabilities

---

**Status**: Active  
**Maintained By**: DevTeam  
**Next Review**: 2026-08-01
`
    },
    {
      id: `skill-csv-analyzer`,
      title: `📊 Skill CSV Analyzer`,
      description: `Skill para cargar, resumir y graficar datos desde archivos CSV`,
      icon: `📊`,
      tag: `Skill`,
      content: `# SKILL: CSV Data Analyzer

> Analiza archivos CSV y proporciona insights estadísticos automáticos

---

## 📋 Metadata

\`\`\`yaml
skill_name: csv-data-analyzer
version: 1.2.0
author: DataTeam
created: 2025-03-20
category: data-processing
complexity: medium
\`\`\`

---

## 🎯 SKILL: CSV Data Analyzer

### Quick Summary
Automatically analyzes CSV files to detect structure, generate statistics, identify data quality issues, and provide actionable insights.

---

## 📖 Description

This skill reads CSV files and performs comprehensive exploratory data analysis (EDA).
It detects column types, calculates statistical measures, identifies outliers and missing
values, and generates a detailed report with visualizations. Perfect for quick data
validation and initial exploration before deeper analysis.

---

## 🎯 Triggers

### Use this skill when:

- [x] User uploads a .csv file
- [x] User mentions "analyze this data"
- [x] User asks about "data quality"
- [x] User requests "statistics" or "summary" of tabular data
- [x] User wants to "explore" or "understand" a dataset
- [x] Phrases like: "what's in this CSV", "check the data", "data overview"

### Do NOT use this skill when:

- [ ] User wants to create/generate CSV files (use csv-creator)
- [ ] User needs data transformation/cleaning (use data-transformer)
- [ ] User wants advanced ML analysis (use ml-analyzer)
- [ ] User is working with other formats (.xlsx, .json) - suggest format conversion

### Keywords/Phrases that trigger this skill:
\`\`\`
"analyze csv", "csv statistics", "data summary", "check this data",
"what's in the file", "data quality", "explore dataset", "csv overview"
\`\`\`

---

## 📥 Inputs

### Required Inputs

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| \`file_path\` | \`string\` | Path to CSV file | \`/data/sales.csv\` |

### Optional Inputs

| Parameter | Type | Default | Description | Example |
|-----------|------|---------|-------------|---------|
| \`delimiter\` | \`string\` | \`,\` | CSV delimiter character | \`;\` or \`\\t\` |
| \`encoding\` | \`string\` | \`utf-8\` | File encoding | \`latin-1\`, \`iso-8859-1\` |
| \`sample_size\` | \`int\` | \`1000\` | Rows for quick preview | \`500\` |
| \`include_plots\` | \`bool\` | \`true\` | Generate visualizations | \`false\` |
| \`auto_detect_types\` | \`bool\` | \`true\` | Auto-detect column types | \`false\` |

### Input Validation

\`\`\`markdown
- File must exist and be readable
- File must be valid CSV format
- File size < 500MB for full analysis (larger files get sampled)
- At least 1 row of data (excluding headers)
\`\`\`

### Input Example

\`\`\`json
{
  "file_path": "/uploads/customer_data.csv",
  "delimiter": ",",
  "sample_size": 1000,
  "include_plots": true
}
\`\`\`

---

## ⚙️ Process

### Overview
The skill reads the CSV, auto-detects structure and types, performs statistical analysis,
checks data quality, and generates a comprehensive report with visualizations.

---

### Detailed Steps

#### Step 1: File Loading & Validation
**Purpose**: Safely load the CSV and verify it's valid

**Actions**:
- Read file with specified encoding
- Detect delimiter if not specified
- Parse CSV into dataframe
- Verify headers exist

**Validations**:
- Check file exists: \`os.path.isfile(file_path)\`
- Verify readable: \`os.access(file_path, os.R_OK)\`
- Validate CSV format: try parsing first 100 rows

**Error Handling**:
- If file not found → Return clear error with path
- If encoding fails → Try common encodings (utf-8, latin-1, cp1252)
- If parsing fails → Suggest delimiter or format issues

---

#### Step 2: Structure Detection
**Purpose**: Understand the dataset structure

**Actions**:
- Count rows and columns
- Detect column names
- Identify column data types
- Sample first/last rows

**Decision Points**:
\`\`\`
IF no header row detected
  THEN use default names (Col1, Col2, ...)
ELSE IF header contains duplicates
  THEN append numbers (Name_1, Name_2)
ELSE
  Use detected headers
\`\`\`

**Output**:
\`\`\`python
structure = {
    "rows": 10543,
    "columns": 8,
    "column_names": ["ID", "Name", "Age", "Salary", ...],
    "memory_usage": "2.3 MB"
}
\`\`\`

---

#### Step 3: Type Detection & Classification
**Purpose**: Automatically detect column data types

**Processing**:
- Analyze each column independently
- Classify as: numeric, categorical, datetime, text, boolean
- Detect mixed types
- Identify ID/key columns

**Type Detection Logic**:
\`\`\`python
FOR each column:
  IF all values are numbers → numeric
  ELSE IF parseable as dates → datetime  
  ELSE IF unique values < 5% of total → categorical
  ELSE IF only True/False/1/0 → boolean
  ELSE → text
\`\`\`

**Output**:
\`\`\`python
types = {
    "ID": "numeric (id)",
    "Name": "text",
    "Age": "numeric (continuous)",
    "Department": "categorical",
    "Join_Date": "datetime",
    "Active": "boolean"
}
\`\`\`

---

#### Step 4: Statistical Analysis
**Purpose**: Generate comprehensive statistics

**For Numeric Columns**:
- Count, Mean, Median, Mode
- Standard Deviation, Variance
- Min, Max, Range
- Quartiles (Q1, Q2, Q3)
- Skewness, Kurtosis
- Outlier detection (IQR method)

**For Categorical Columns**:
- Unique value count
- Most/least frequent values
- Frequency distribution
- Cardinality ratio

**For Datetime Columns**:
- Earliest/latest dates
- Date range
- Common patterns (day of week, month)

**For Text Columns**:
- Average length
- Min/max length
- Common words (if applicable)

---

#### Step 5: Data Quality Assessment
**Purpose**: Identify data issues

**Checks Performed**:
- **Missing Values**: Count and percentage per column
- **Duplicates**: Check for duplicate rows
- **Outliers**: Identify statistical outliers
- **Consistency**: Check for format inconsistencies
- **Completeness**: Overall data completeness score

**Quality Score Calculation**:
\`\`\`python
score = (
    (1 - missing_ratio) * 0.4 +
    (1 - duplicate_ratio) * 0.3 +
    (consistency_score) * 0.2 +
    (outlier_reasonability) * 0.1
) * 100
\`\`\`

---

#### Step 6: Visualization Generation
**Purpose**: Create visual insights (if enabled)

**Plots Created**:
- Distribution plots for numeric columns
- Bar charts for top categorical values
- Correlation heatmap
- Missing value matrix
- Box plots for outlier visualization

**Technical Approach**:
\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

# Save plots as base64 or files
plots = {
    "distributions": [...],
    "correlations": ...,
    "missing_data": ...
}
\`\`\`

---

#### Step 7: Report Generation
**Purpose**: Compile all findings into structured report

**Report Sections**:
1. Executive Summary
2. Dataset Overview
3. Column Details
4. Statistical Summary
5. Data Quality Report
6. Recommendations
7. Visualizations (if included)

---

#### Step 8: Cleanup & Return
**Purpose**: Finalize and return results

**Actions**:
- Format output as JSON/dict
- Include metadata (processing time, version)
- Clean up temporary files
- Return structured response

---

## 📤 Outputs

### Success Output

\`\`\`json
{
  "status": "success",
  "data": {
    "summary": {
      "file_name": "sales_data.csv",
      "total_rows": 10543,
      "total_columns": 8,
      "memory_usage": "2.3 MB",
      "processing_time": "3.2s"
    },
    "structure": {
      "columns": [
        {
          "name": "Customer_ID",
          "type": "numeric (id)",
          "unique_values": 10543,
          "missing": 0,
          "sample": [1001, 1002, 1003]
        },
        {
          "name": "Age",
          "type": "numeric (continuous)",
          "stats": {
            "mean": 42.3,
            "median": 41,
            "std": 12.5,
            "min": 18,
            "max": 85,
            "q1": 32,
            "q3": 53
          },
          "missing": 15,
          "outliers": 23
        }
      ]
    },
    "quality": {
      "overall_score": 87.5,
      "missing_values": {
        "total": 127,
        "percentage": 1.2,
        "affected_columns": ["Age", "Email"]
      },
      "duplicates": {
        "count": 3,
        "rows": [145, 2031, 8765]
      },
      "issues": [
        {
          "severity": "medium",
          "column": "Email",
          "description": "45 invalid email formats detected"
        }
      ]
    },
    "recommendations": [
      "Consider removing 3 duplicate rows",
      "Fill or investigate 127 missing values",
      "Review 23 outliers in Age column"
    ]
  },
  "visualizations": {
    "correlation_matrix": "base64_encoded_image",
    "age_distribution": "base64_encoded_image"
  },
  "metadata": {
    "analyzer_version": "1.2.0",
    "timestamp": "2026-05-16T10:30:00Z"
  }
}
\`\`\`

---

### Error Output

\`\`\`json
{
  "status": "error",
  "error": {
    "code": "ENCODING_ERROR",
    "message": "Unable to read file with specified encoding",
    "details": "UnicodeDecodeError: 'utf-8' codec can't decode byte 0xff",
    "suggestion": "Try encoding='latin-1' or encoding='cp1252'"
  },
  "context": {
    "step": "file_loading",
    "file_path": "/data/sales.csv",
    "attempted_encodings": ["utf-8"]
  },
  "helpful_info": {
    "common_encodings": ["utf-8", "latin-1", "cp1252", "iso-8859-1"],
    "auto_detect_available": true
  }
}
\`\`\`

---

## 🚨 Error Handling

### Error Categories

#### 1. File Access Errors

| Error Code | Condition | User Message | Action |
|------------|-----------|--------------|--------|
| \`FILE_NOT_FOUND\` | Path doesn't exist | "Cannot find file at {path}" | Verify path |
| \`PERMISSION_DENIED\` | No read permission | "No permission to read {file}" | Check permissions |
| \`FILE_TOO_LARGE\` | Size > 500MB | "File exceeds 500MB limit" | Offer sampling |

---

#### 2. Format Errors

| Error Code | Condition | User Message | Action |
|------------|-----------|--------------|--------|
| \`INVALID_CSV\` | Not valid CSV | "File is not valid CSV format" | Suggest CSV validation |
| \`ENCODING_ERROR\` | Wrong encoding | "Cannot decode with {encoding}" | Try alternatives |
| \`DELIMITER_UNKNOWN\` | Can't detect delimiter | "Unable to detect delimiter" | Ask user |
| \`NO_DATA\` | Empty file | "File contains no data" | Verify file |

---

#### 3. Processing Errors

| Error Code | Condition | User Message | Action |
|------------|-----------|--------------|--------|
| \`MEMORY_ERROR\` | Out of memory | "File too large for available memory" | Offer chunking |
| \`CORRUPT_DATA\` | Malformed rows | "Found {n} corrupted rows" | Skip and report |
| \`TIMEOUT\` | Processing > 60s | "Analysis timed out" | Reduce sample size |

---

### Fallback Strategies

\`\`\`markdown
1. **Encoding Detection Fails**
   → Try encodings: utf-8 → latin-1 → cp1252 → chardet.detect()
   → If all fail → Return raw bytes sample for user inspection

2. **Large File (>500MB)**
   → Sample first 100k rows
   → Perform analysis on sample
   → Note: "Analysis based on 100k row sample"

3. **Corrupted Rows**
   → Skip bad rows
   → Continue with valid data
   → Report: "{n} rows skipped due to errors"

4. **Memory Constraints**
   → Process in chunks
   → Use iterative statistics calculations
   → Stream results instead of loading all at once
\`\`\`

---

## 💡 Examples

### Example 1: Standard Analysis

**Scenario**: User uploads sales data CSV for quick overview

**User Request**: 
\`\`\`
"Can you analyze sales_2025.csv and tell me what's in it?"
\`\`\`

**Skill Execution**:
\`\`\`markdown
1. Loads: sales_2025.csv (15,234 rows, 12 columns)
2. Detects: Types, structure, statistics
3. Analyzes: Quality, missing values, outliers
4. Generates: Report + 5 visualizations
5. Returns: Comprehensive analysis in 4.2s
\`\`\`

**Output Summary**:
\`\`\`
Dataset: sales_2025.csv
- 15,234 sales records
- 12 columns (8 numeric, 3 categorical, 1 datetime)
- 98.5% data quality score
- Issues: 45 missing emails, 3 duplicate transactions
- Key insight: Sales peaked in Q4, 23% above average
\`\`\`

---

### Example 2: Data Quality Check

**Scenario**: User suspects data quality issues

**User Request**: 
\`\`\`
"Check customer_data.csv for any problems"
\`\`\`

**Skill Execution**:
\`\`\`markdown
1. Loads and validates file
2. Runs comprehensive quality checks
3. Identifies issues:
   - 234 missing phone numbers (15%)
   - 12 duplicate customer IDs
   - 78 invalid email formats
   - 5 age outliers (>120 years - likely errors)
4. Generates quality report
\`\`\`

**Output**:
\`\`\`json
{
  "quality_score": 78.5,
  "issues_found": 4,
  "critical": [
    "12 duplicate customer IDs must be resolved"
  ],
  "warnings": [
    "234 missing phone numbers (15% of records)",
    "78 emails don't match standard format",
    "5 age values appear invalid (>120)"
  ],
  "recommendations": [
    "De-duplicate by Customer_ID",
    "Validate email addresses",
    "Review age values > 100"
  ]
}
\`\`\`

---

### Example 3: Large File Handling

**Scenario**: User uploads 750MB CSV file

**User Request**: 
\`\`\`
"Analyze transaction_log.csv"
\`\`\`

**Skill Execution**:
\`\`\`markdown
1. Detects: File size 750MB (exceeds 500MB limit)
2. Asks: "File is large. Analyze full file (slower) or sample 100k rows (faster)?"
3. User chooses: Sample
4. Processes: First 100,000 rows
5. Returns: Analysis with note about sampling
\`\`\`

**Output**:
\`\`\`
⚠️ Note: Analysis based on 100,000 row sample (13% of total)

Dataset: transaction_log.csv (sampled)
- Total rows: ~750,000 (estimated from 100k sample)
- 18 columns
- 94% data quality score
- Processing time: 5.8s (vs estimated 45s for full file)

To analyze full dataset:
- Use sampling=false
- Or split file into smaller chunks
\`\`\`

---

## 🔧 Dependencies

### Required Dependencies

#### Python Libraries
\`\`\`
pandas>=2.0.0          # Core data manipulation
numpy>=1.24.0          # Numerical operations  
matplotlib>=3.7.0      # Plotting
seaborn>=0.12.0        # Statistical visualizations
\`\`\`

#### System Requirements
- Python 3.9+
- RAM: 4GB minimum, 8GB recommended
- Disk: 100MB for temporary files

---

### Optional Dependencies

#### For Enhanced Features
\`\`\`
chardet>=5.0.0         # Automatic encoding detection
scipy>=1.10.0          # Advanced statistics
plotly>=5.14.0         # Interactive visualizations
\`\`\`

#### Installation Commands
\`\`\`bash
# Required
pip install pandas numpy matplotlib seaborn

# Optional
pip install chardet scipy plotly
\`\`\`

---

## 📊 Performance

### Benchmarks

| File Size | Rows | Columns | Time | Memory |
|-----------|------|---------|------|--------|
| 1 MB | 1,000 | 10 | 0.5s | 50 MB |
| 10 MB | 10,000 | 10 | 1.2s | 120 MB |
| 100 MB | 100,000 | 20 | 5.5s | 450 MB |
| 500 MB | 500,000 | 20 | 28s | 2 GB |

### Optimization Tips
- Use sampling for files >100MB
- Disable visualizations for faster processing
- Specify correct delimiter to avoid auto-detection
- Pre-clean data when possible

---

## 🔒 Security & Privacy

### Data Handling
- **Input sanitization**: File paths validated to prevent path traversal
- **Sensitive data**: No data is stored after analysis
- **Logging**: Only metadata logged (file size, processing time), never actual data

### Privacy Considerations
- Don't store: Any actual data values
- Don't log: Column names that might contain PII
- Retention: All analysis data cleared after response sent

---

## 🧪 Testing

### Unit Tests

\`\`\`python
def test_csv_loading():
    # Test: Load valid CSV
    result = analyzer.load("test_data.csv")
    assert result.status == "success"
    assert result.rows > 0

def test_type_detection():
    # Test: Correctly detect column types
    result = analyzer.analyze("mixed_types.csv")
    assert result.types["age"] == "numeric"
    assert result.types["name"] == "text"

def test_missing_values():
    # Test: Detect missing values
    result = analyzer.analyze("missing_data.csv")
    assert result.missing_count > 0
\`\`\`

---

## 📝 Notes

### Important Considerations
- Large files are automatically sampled to prevent memory issues
- Outlier detection uses IQR method (may miss domain-specific outliers)
- Correlation analysis only works for numeric columns

### Known Issues
- Very wide files (>100 columns) may have truncated visualizations
- Date format detection works best with ISO 8601 or common US/EU formats

### Future Enhancements
- [ ] Add support for streaming analysis of huge files
- [ ] Implement ML-based type detection
- [ ] Add custom validation rules
- [ ] Support for multi-sheet Excel files

---

## 🔄 Version History

### v1.2.0 - 2026-05-01
- Added automatic encoding detection
- Improved outlier detection algorithm
- Added interactive visualizations option

### v1.1.0 - 2025-11-15
- Added support for large files (sampling)
- Improved error messages
- Added quality scoring system

### v1.0.0 - 2025-03-20
- Initial release
- Basic CSV analysis
- Statistical summaries

---

## 📚 Related Skills

- **csv-transformer**: For cleaning and transforming CSV data
- **data-visualizer**: For advanced custom visualizations
- **ml-analyzer**: For machine learning analysis on CSV data
- **excel-analyzer**: For analyzing .xlsx files (uses this skill internally)

---

**Last Updated**: 2026-05-16  
**Status**: Active  
**Maintained By**: DataTeam
`
    }
];
