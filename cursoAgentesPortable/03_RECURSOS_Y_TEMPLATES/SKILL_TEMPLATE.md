# SKILL TEMPLATE

> Plantilla estándar para crear skills reutilizables

---

## 📋 Metadata

```yaml
skill_name: [nombre-del-skill]
version: 1.0.0
author: [tu-nombre]
created: [fecha]
category: [data-processing/api/file-handling/analysis/etc]
complexity: [low/medium/high]
```

---

## 🎯 SKILL: [Nombre Descriptivo del Skill]

### Quick Summary
[Descripción de una línea de qué hace este skill]

---

## 📖 Description

[Descripción detallada de 2-4 oraciones explicando:]
- Qué hace el skill
- Para qué casos de uso está diseñado
- Qué valor aporta

**Example**: 
```
This skill extracts structured data from CSV files, performs basic statistical
analysis, and identifies data quality issues. It's designed for quick data 
exploration and validation before deeper analysis.
```

---

## 🎯 Triggers

### Use this skill when:

- [ ] [Condición específica 1]
- [ ] [Condición específica 2]
- [ ] [Condición específica 3]
- [ ] [Palabra clave o frase específica]
- [ ] [Contexto específico]

### Do NOT use this skill when:

- [ ] [Exclusión 1]
- [ ] [Exclusión 2]
- [ ] [Exclusión 3]

### Keywords/Phrases that trigger this skill:
```
"[keyword1]", "[keyword2]", "[phrase1]", "[phrase2]"
```

---

## 📥 Inputs

### Required Inputs

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `[param1]` | `[type]` | [descripción] | `[ejemplo]` |
| `[param2]` | `[type]` | [descripción] | `[ejemplo]` |

### Optional Inputs

| Parameter | Type | Default | Description | Example |
|-----------|------|---------|-------------|---------|
| `[param1]` | `[type]` | `[default]` | [descripción] | `[ejemplo]` |
| `[param2]` | `[type]` | `[default]` | [descripción] | `[ejemplo]` |

### Input Validation

```markdown
- [Validación 1]: [criterio]
- [Validación 2]: [criterio]
- [Validación 3]: [criterio]
```

### Input Example

```json
{
  "param1": "value1",
  "param2": "value2",
  "param3": true
}
```

---

## ⚙️ Process

### Overview
[Descripción general del flujo de trabajo en 1-2 oraciones]

### Detailed Steps

#### Step 1: [Nombre del Paso]
**Purpose**: [Para qué sirve este paso]

**Actions**:
- [Acción 1]
- [Acción 2]
- [Acción 3]

**Validations**:
- [Validación 1]
- [Validación 2]

**Error Handling**:
- If [condición] → [acción]

---

#### Step 2: [Nombre del Paso]
**Purpose**: [Para qué sirve este paso]

**Actions**:
- [Acción 1]
- [Acción 2]

**Decision Points**:
```
IF [condición]
  THEN [acción A]
ELSE IF [condición]
  THEN [acción B]
ELSE
  [acción C]
```

---

#### Step 3: [Nombre del Paso]
**Purpose**: [Para qué sirve este paso]

**Processing**:
- [Procesamiento 1]
- [Procesamiento 2]

**Output Generation**:
- [Qué se genera]

---

#### Step 4: [Finalización]
**Purpose**: Cleanup and return results

**Actions**:
- [Cleanup 1]
- [Cleanup 2]
- [Return formatted output]

---

### Flowchart

```
START
  ↓
[Validation]
  ↓
[Step 1: Setup]
  ↓
[Step 2: Processing]
  ↓
[Step 3: Analysis]
  ↓
[Step 4: Output]
  ↓
END
```

---

## 📤 Outputs

### Success Output

#### Structure
```json
{
  "status": "success",
  "data": {
    "[field1]": "[value]",
    "[field2]": "[value]",
    "[results]": []
  },
  "metadata": {
    "processing_time": "[time]",
    "records_processed": "[count]",
    "quality_score": "[score]"
  },
  "warnings": []
}
```

#### Example Success Response
```json
{
  "status": "success",
  "data": {
    "summary": "Processed 1,234 records",
    "insights": [
      "Insight 1",
      "Insight 2"
    ]
  },
  "metadata": {
    "processing_time": "2.3s",
    "records_processed": 1234
  }
}
```

---

### Error Output

#### Structure
```json
{
  "status": "error",
  "error": {
    "code": "[ERROR_CODE]",
    "message": "[User-friendly message]",
    "details": "[Technical details]",
    "suggestion": "[How to fix]"
  },
  "context": {
    "step": "[Where error occurred]",
    "input": "[Problematic input]"
  }
}
```

#### Example Error Response
```json
{
  "status": "error",
  "error": {
    "code": "INVALID_FORMAT",
    "message": "File format not supported",
    "details": "Expected .csv, got .xlsx",
    "suggestion": "Convert file to CSV format or use xlsx-processor skill"
  },
  "context": {
    "step": "validation",
    "input": "document.xlsx"
  }
}
```

---

## 🚨 Error Handling

### Error Categories

#### 1. Input Errors
**Type**: User input validation failures

| Error Code | Condition | User Message | Action |
|------------|-----------|--------------|--------|
| `MISSING_PARAM` | Required param missing | "Missing [param]: [description]" | Request param |
| `INVALID_TYPE` | Wrong data type | "[param] must be [type]" | Request correction |
| `OUT_OF_RANGE` | Value out of bounds | "[param] must be between [min] and [max]" | Request valid value |

---

#### 2. Processing Errors
**Type**: Errors during execution

| Error Code | Condition | User Message | Action |
|------------|-----------|--------------|--------|
| `PARSE_FAILED` | Cannot parse data | "Unable to parse [data type]" | Suggest format |
| `RESOURCE_ERROR` | External resource issue | "Cannot access [resource]" | Check availability |
| `TIMEOUT` | Operation timeout | "Operation took too long" | Offer retry |

---

#### 3. System Errors
**Type**: Internal failures

| Error Code | Condition | User Message | Action |
|------------|-----------|--------------|--------|
| `INTERNAL_ERROR` | Unexpected failure | "An unexpected error occurred" | Log & notify |
| `DEPENDENCY_MISSING` | Required tool missing | "[tool] not available" | Install guide |

---

### Fallback Strategies

```markdown
1. **Primary Method Fails**
   → Try [alternative method]
   → If that fails → [manual fallback]

2. **Partial Success**
   → Return partial results
   → Note what failed
   → Suggest completion

3. **Complete Failure**
   → Provide diagnostic info
   → Suggest alternative skills
   → Log for improvement
```

---

## 💡 Examples

### Example 1: [Common Use Case]

**Scenario**: [Descripción del escenario]

**User Request**: 
```
"[Typical user request]"
```

**Skill Execution**:
```markdown
1. Receives: [input]
2. Validates: [checks]
3. Processes: [steps]
4. Returns: [output]
```

**Output**:
```
[Expected output format/content]
```

**Time**: ~[X] seconds

---

### Example 2: [Edge Case]

**Scenario**: [Caso límite o inusual]

**User Request**: 
```
"[Edge case request]"
```

**Skill Execution**:
```markdown
1. Detects edge case condition
2. Applies special handling: [details]
3. Validates: [extra checks]
4. Returns: [adjusted output]
```

**Output**:
```
[Expected output for edge case]
```

**Notes**: [Consideraciones especiales]

---

### Example 3: [Error Case]

**Scenario**: [Caso que produce error]

**User Request**: 
```
"[Request that causes error]"
```

**Skill Execution**:
```markdown
1. Attempts: [action]
2. Encounters: [specific error]
3. Handles gracefully: [how]
4. Returns: [error response]
```

**Output**:
```json
{
  "status": "error",
  "error": {
    "message": "[Helpful error message]",
    "suggestion": "[How to fix]"
  }
}
```

---

## 🔧 Dependencies

### Required Dependencies

#### Software/Tools
- `[tool1]` (v[version]+) - [purpose]
- `[tool2]` (v[version]+) - [purpose]

#### Libraries
```
[language] packages:
- [package1]==X.X.X
- [package2]==X.X.X
```

#### System Requirements
- OS: [operating systems]
- RAM: [minimum memory]
- Disk: [space needed]
- Network: [connectivity requirements]

---

### Optional Dependencies

#### For Enhanced Features
- `[optional-tool]` - Enables [feature]
- `[optional-lib]` - Improves [aspect]

#### Installation Commands
```bash
# Required
[install command 1]
[install command 2]

# Optional
[install command 3]
```

---

## 📊 Performance

### Benchmarks

| Input Size | Processing Time | Memory Usage |
|------------|----------------|--------------|
| Small (<1MB) | <1s | <50MB |
| Medium (1-10MB) | 1-5s | 50-200MB |
| Large (10-100MB) | 5-30s | 200-500MB |
| Very Large (>100MB) | 30s+ | 500MB+ |

### Optimization Tips
- [Tip 1]
- [Tip 2]
- [Tip 3]

### Limitations
- Maximum file size: [size]
- Maximum records: [count]
- Timeout: [duration]

---

## 🔒 Security & Privacy

### Data Handling
- **Input sanitization**: [what's cleaned]
- **Sensitive data**: [how handled]
- **Logging**: [what's logged/not logged]

### Privacy Considerations
- Don't store: [types of data]
- Encrypt: [when to encrypt]
- Retention: [data retention policy]

---

## 🧪 Testing

### Unit Tests

```markdown
Test 1: [Test name]
- Input: [test input]
- Expected: [expected output]
- Validates: [what aspect]

Test 2: [Test name]
- Input: [test input]
- Expected: [expected output]
- Validates: [what aspect]
```

### Integration Tests

```markdown
Test: [Integration scenario]
- Setup: [prerequisites]
- Execute: [actions]
- Verify: [outcomes]
```

### Test Coverage Goals
- [ ] All input validations: 100%
- [ ] Happy paths: 100%
- [ ] Error conditions: 90%+
- [ ] Edge cases: 80%+

---

## 📝 Notes

### Important Considerations
- [Consideración importante 1]
- [Consideración importante 2]

### Known Issues
- [Issue 1]: [workaround]
- [Issue 2]: [workaround]

### Future Enhancements
- [ ] [Enhancement 1]
- [ ] [Enhancement 2]
- [ ] [Enhancement 3]

---

## 🔄 Version History

### v1.0.0 - [Date]
- Initial release
- [Feature 1]
- [Feature 2]

### v0.9.0 - [Date]
- Beta release
- [Feature/Fix]

---

## 📚 Related Skills

- **[Related Skill 1]**: [Relationship/when to use instead]
- **[Related Skill 2]**: [Relationship/when to combine]
- **[Related Skill 3]**: [Relationship/complementary use]

---

## 📞 Support

### Documentation
- [Link to detailed docs]

### Issues
- [Where to report bugs]

### Contributions
- [How to contribute]

---

**Last Updated**: [Date]  
**Status**: [Active/Beta/Experimental]  
**Maintained By**: [Name/Team]
