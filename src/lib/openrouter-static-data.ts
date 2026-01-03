/**
 * Auto-generated OpenRouter Static Data
 * 
 * Generated: 2026-01-03
 * Source: https://openrouter.ai/api/v1/models
 * Total models: 353
 * 
 * DO NOT EDIT MANUALLY - Run 'npm run generate:static-data' to regenerate
 */

import { OpenRouterModel } from '@/types/models';

export const OPENROUTER_STATIC_DATA: OpenRouterModel[] = [
  {
    "id": "ai21/jamba-large-1.7",
    "name": "AI21: Jamba Large 1.7",
    "description": "Jamba Large 1.7 is the latest model in the Jamba open family, offering improvements in grounding, instruction-following, and overall efficiency. Built on a hybrid SSM-Transformer architecture with a 256K context window, it delivers more accurate, contextually grounded responses and better steerab...",
    "context_length": 256000,
    "pricing": {
      "prompt": "0.000002",
      "completion": "0.000008"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1754669020
  },
  {
    "id": "ai21/jamba-mini-1.7",
    "name": "AI21: Jamba Mini 1.7",
    "description": "Jamba Mini 1.7 is a compact and efficient member of the Jamba open model family, incorporating key improvements in grounding and instruction-following while maintaining the benefits of the SSM-Transformer hybrid architecture and 256K context window. Despite its compact size, it delivers accurate,...",
    "context_length": 256000,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000004"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1754670601
  },
  {
    "id": "aion-labs/aion-1.0",
    "name": "AionLabs: Aion-1.0",
    "description": "Aion-1.0 is a multi-model system designed for high performance across various tasks, including reasoning and coding. It is built on DeepSeek-R1, augmented with additional models and techniques such as Tree of Thoughts (ToT) and Mixture of Experts (MoE). It is Aion Lab's most powerful reasoning mo...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.000004",
      "completion": "0.000008"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738697557
  },
  {
    "id": "aion-labs/aion-1.0-mini",
    "name": "AionLabs: Aion-1.0-Mini",
    "description": "Aion-1.0-Mini 32B parameter model is a distilled version of the DeepSeek-R1 model, designed for strong performance in reasoning domains such as mathematics, coding, and logic. It is a modified variant of a FuseAI model that outperforms R1-Distill-Qwen-32B and R1-Distill-Llama-70B, with benchmark ...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000007",
      "completion": "0.0000014"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738697107
  },
  {
    "id": "aion-labs/aion-rp-llama-3.1-8b",
    "name": "AionLabs: Aion-RP 1.0 (8B)",
    "description": "Aion-RP-Llama-3.1-8B ranks the highest in the character evaluation portion of the RPBench-Auto benchmark, a roleplaying-specific variant of Arena-Hard-Auto, where LLMs evaluate each other’s responses. It is a fine-tuned base model rather than an instruct model, designed to produce more natural an...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.0000008",
      "completion": "0.0000016"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738696718
  },
  {
    "id": "alfredpros/codellama-7b-instruct-solidity",
    "name": "AlfredPros: CodeLLaMa 7B Instruct Solidity",
    "description": "A finetuned 7 billion parameters Code LLaMA - Instruct model to generate Solidity smart contract using 4-bit QLoRA finetuning provided by PEFT library.",
    "context_length": 4096,
    "pricing": {
      "prompt": "0.0000008",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other",
      "instruct_type": "alpaca"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1744641874
  },
  {
    "id": "allenai/olmo-2-0325-32b-instruct",
    "name": "AllenAI: Olmo 2 32B Instruct",
    "description": "OLMo-2 32B Instruct is a supervised instruction-finetuned variant of the OLMo-2 32B March 2025 base model. It excels in complex reasoning and instruction-following tasks across diverse benchmarks such as GSM8K, MATH, IFEval, and general NLP evaluation. Developed by AI2, OLMo-2 32B is part of an o...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00000005",
      "completion": "0.0000002"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1741988556
  },
  {
    "id": "allenai/olmo-3-32b-think:free",
    "name": "AllenAI: Olmo 3 32B Think (free)",
    "description": "Olmo 3 32B Think is a large-scale, 32-billion-parameter model purpose-built for deep reasoning, complex logic chains and advanced instruction-following scenarios. Its capacity enables strong performance on demanding evaluation tasks and highly nuanced conversational reasoning. Developed by Ai2 un...",
    "context_length": 65536,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1763758276
  },
  {
    "id": "allenai/olmo-3-7b-instruct",
    "name": "AllenAI: Olmo 3 7B Instruct",
    "description": "Olmo 3 7B Instruct is a supervised instruction-fine-tuned variant of the Olmo 3 7B base model, optimized for instruction-following, question-answering, and natural conversational dialogue. By leveraging high-quality instruction data and an open training pipeline, it delivers strong performance ac...",
    "context_length": 65536,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000002"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1763758273
  },
  {
    "id": "allenai/olmo-3-7b-think",
    "name": "AllenAI: Olmo 3 7B Think",
    "description": "Olmo 3 7B Think is a research-oriented language model in the Olmo family designed for advanced reasoning and instruction-driven tasks. It excels at multi-step problem solving, logical inference, and maintaining coherent conversational context. Developed by Ai2 under the Apache 2.0 license, Olmo 3...",
    "context_length": 65536,
    "pricing": {
      "prompt": "0.00000012",
      "completion": "0.0000002"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1763758270
  },
  {
    "id": "allenai/olmo-3.1-32b-think:free",
    "name": "AllenAI: Olmo 3.1 32B Think (free)",
    "description": "Olmo 3.1 32B Think is a large-scale, 32-billion-parameter model designed for deep reasoning, complex multi-step logic, and advanced instruction following. Building on the Olmo 3 series, version 3.1 delivers refined reasoning behavior and stronger performance across demanding evaluations and nuanc...",
    "context_length": 65536,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1765907719
  },
  {
    "id": "amazon/nova-2-lite-v1",
    "name": "Amazon: Nova 2 Lite",
    "description": "Nova 2 Lite is a fast, cost-effective reasoning model for everyday workloads that can process text, images, and videos to generate text. \n\nNova 2 Lite demonstrates standout capabilities in processing documents, extracting information from videos, generating code, providing accurate grounded answe...",
    "context_length": 1000000,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000025"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Nova"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1764696672
  },
  {
    "id": "amazon/nova-lite-v1",
    "name": "Amazon: Nova Lite 1.0",
    "description": "Amazon Nova Lite 1.0 is a very low-cost multimodal model from Amazon that focused on fast processing of image, video, and text inputs to generate text output. Amazon Nova Lite can handle real-time customer interactions, document analysis, and visual question-answering tasks with high accuracy.\n\nW...",
    "context_length": 300000,
    "pricing": {
      "prompt": "0.00000006",
      "completion": "0.00000024"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Nova"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1733437363
  },
  {
    "id": "amazon/nova-micro-v1",
    "name": "Amazon: Nova Micro 1.0",
    "description": "Amazon Nova Micro 1.0 is a text-only model that delivers the lowest latency responses in the Amazon Nova family of models at a very low cost. With a context length of 128K tokens and optimized for speed and cost, Amazon Nova Micro excels at tasks such as text summarization, translation, content c...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.000000035",
      "completion": "0.00000014"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Nova"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1733437237
  },
  {
    "id": "amazon/nova-premier-v1",
    "name": "Amazon: Nova Premier 1.0",
    "description": "Amazon Nova Premier is the most capable of Amazon’s multimodal models for complex reasoning tasks and for use as the best teacher for distilling custom models.",
    "context_length": 1000000,
    "pricing": {
      "prompt": "0.0000025",
      "completion": "0.0000125"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Nova"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1761950332
  },
  {
    "id": "amazon/nova-pro-v1",
    "name": "Amazon: Nova Pro 1.0",
    "description": "Amazon Nova Pro 1.0 is a capable multimodal model from Amazon focused on providing a combination of accuracy, speed, and cost for a wide range of tasks. As of December 2024, it achieves state-of-the-art performance on key benchmarks including visual question answering (TextVQA) and video understa...",
    "context_length": 300000,
    "pricing": {
      "prompt": "0.0000008",
      "completion": "0.0000032"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Nova"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1733436303
  },
  {
    "id": "anthropic/claude-3-haiku",
    "name": "Anthropic: Claude 3 Haiku",
    "description": "Claude 3 Haiku is Anthropic's fastest and most compact model for\nnear-instant responsiveness. Quick and accurate targeted performance.\n\nSee the launch announcement and benchmark results [here](https://www.anthropic.com/news/claude-3-haiku)\n\n#multimodal",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.00000025",
      "completion": "0.00000125"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Claude"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1710288000
  },
  {
    "id": "anthropic/claude-3-opus",
    "name": "Anthropic: Claude 3 Opus",
    "description": "Claude 3 Opus is Anthropic's most powerful model for highly complex tasks. It boasts top-level performance, intelligence, fluency, and understanding.\n\nSee the launch announcement and benchmark results [here](https://www.anthropic.com/news/claude-3-family)\n\n#multimodal",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.000015",
      "completion": "0.000075"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Claude"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1709596800
  },
  {
    "id": "anthropic/claude-3.5-haiku",
    "name": "Anthropic: Claude 3.5 Haiku",
    "description": "Claude 3.5 Haiku features offers enhanced capabilities in speed, coding accuracy, and tool use. Engineered to excel in real-time applications, it delivers quick response times that are essential for dynamic tasks such as chat interactions and immediate coding suggestions.\n\nThis makes it highly su...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.0000008",
      "completion": "0.000004"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Claude"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1730678400
  },
  {
    "id": "anthropic/claude-3.5-haiku-20241022",
    "name": "Anthropic: Claude 3.5 Haiku (2024-10-22)",
    "description": "Claude 3.5 Haiku features enhancements across all skill sets including coding, tool use, and reasoning. As the fastest model in the Anthropic lineup, it offers rapid response times suitable for applications that require high interactivity and low latency, such as user-facing chatbots and on-the-f...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.0000008",
      "completion": "0.000004"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Claude"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1730678400
  },
  {
    "id": "anthropic/claude-3.5-sonnet",
    "name": "Anthropic: Claude 3.5 Sonnet",
    "description": "New Claude 3.5 Sonnet delivers better-than-Opus capabilities, faster-than-Sonnet speeds, at the same Sonnet prices. Sonnet is particularly good at:\n\n- Coding: Scores ~49% on SWE-Bench Verified, higher than the last best score, and without any fancy prompt scaffolding\n- Data science: Augments huma...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.000006",
      "completion": "0.00003"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Claude"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1729555200
  },
  {
    "id": "anthropic/claude-3.7-sonnet",
    "name": "Anthropic: Claude 3.7 Sonnet",
    "description": "Claude 3.7 Sonnet is an advanced large language model with improved reasoning, coding, and problem-solving capabilities. It introduces a hybrid reasoning approach, allowing users to choose between rapid responses and extended, step-by-step processing for complex tasks. The model demonstrates nota...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.000003",
      "completion": "0.000015"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Claude"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1740422110
  },
  {
    "id": "anthropic/claude-3.7-sonnet:thinking",
    "name": "Anthropic: Claude 3.7 Sonnet (thinking)",
    "description": "Claude 3.7 Sonnet is an advanced large language model with improved reasoning, coding, and problem-solving capabilities. It introduces a hybrid reasoning approach, allowing users to choose between rapid responses and extended, step-by-step processing for complex tasks. The model demonstrates nota...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.000003",
      "completion": "0.000015"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Claude"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1740422110
  },
  {
    "id": "anthropic/claude-haiku-4.5",
    "name": "Anthropic: Claude Haiku 4.5",
    "description": "Claude Haiku 4.5 is Anthropic’s fastest and most efficient model, delivering near-frontier intelligence at a fraction of the cost and latency of larger Claude models. Matching Claude Sonnet 4’s performance across reasoning, coding, and computer-use tasks, Haiku 4.5 brings frontier-level capabilit...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.000001",
      "completion": "0.000005"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Claude"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1760547638
  },
  {
    "id": "anthropic/claude-opus-4",
    "name": "Anthropic: Claude Opus 4",
    "description": "Claude Opus 4 is benchmarked as the world’s best coding model, at time of release, bringing sustained performance on complex, long-running tasks and agent workflows. It sets new benchmarks in software engineering, achieving leading results on SWE-bench (72.5%) and Terminal-bench (43.2%). Opus 4 s...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.000015",
      "completion": "0.000075"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Claude"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1747931245
  },
  {
    "id": "anthropic/claude-opus-4.1",
    "name": "Anthropic: Claude Opus 4.1",
    "description": "Claude Opus 4.1 is an updated version of Anthropic’s flagship model, offering improved performance in coding, reasoning, and agentic tasks. It achieves 74.5% on SWE-bench Verified and shows notable gains in multi-file code refactoring, debugging precision, and detail-oriented reasoning. The model...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.000015",
      "completion": "0.000075"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Claude"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1754411591
  },
  {
    "id": "anthropic/claude-opus-4.5",
    "name": "Anthropic: Claude Opus 4.5",
    "description": "Claude Opus 4.5 is Anthropic’s frontier reasoning model optimized for complex software engineering, agentic workflows, and long-horizon computer use. It offers strong multimodal capabilities, competitive performance across real-world coding and reasoning benchmarks, and improved robustness to pro...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.000005",
      "completion": "0.000025"
    },
    "architecture": {
      "input_modalities": [
        "file",
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Claude"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1764010580
  },
  {
    "id": "anthropic/claude-sonnet-4",
    "name": "Anthropic: Claude Sonnet 4",
    "description": "Claude Sonnet 4 significantly enhances the capabilities of its predecessor, Sonnet 3.7, excelling in both coding and reasoning tasks with improved precision and controllability. Achieving state-of-the-art performance on SWE-bench (72.7%), Sonnet 4 balances capability and computational efficiency,...",
    "context_length": 1000000,
    "pricing": {
      "prompt": "0.000003",
      "completion": "0.000015"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Claude"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1747930371
  },
  {
    "id": "anthropic/claude-sonnet-4.5",
    "name": "Anthropic: Claude Sonnet 4.5",
    "description": "Claude Sonnet 4.5 is Anthropic’s most advanced Sonnet model to date, optimized for real-world agents and coding workflows. It delivers state-of-the-art performance on coding benchmarks such as SWE-bench Verified, with improvements across system design, code security, and specification adherence. ...",
    "context_length": 1000000,
    "pricing": {
      "prompt": "0.000003",
      "completion": "0.000015"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Claude"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1759161676
  },
  {
    "id": "arcee-ai/coder-large",
    "name": "Arcee AI: Coder Large",
    "description": "Coder‑Large is a 32 B‑parameter offspring of Qwen 2.5‑Instruct that has been further trained on permissively‑licensed GitHub, CodeSearchNet and synthetic bug‑fix corpora. It supports a 32k context window, enabling multi‑file refactoring or long diff review in a single call, and understands 30‑plu...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.0000005",
      "completion": "0.0000008"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1746478663
  },
  {
    "id": "arcee-ai/maestro-reasoning",
    "name": "Arcee AI: Maestro Reasoning",
    "description": "Maestro Reasoning is Arcee's flagship analysis model: a 32 B‑parameter derivative of Qwen 2.5‑32 B tuned with DPO and chain‑of‑thought RL for step‑by‑step logic. Compared to the earlier 7 B preview, the production 32 B release widens the context window to 128 k tokens and doubles pass‑rate on MAT...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000009",
      "completion": "0.0000033"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1746481269
  },
  {
    "id": "arcee-ai/spotlight",
    "name": "Arcee AI: Spotlight",
    "description": "Spotlight is a 7‑billion‑parameter vision‑language model derived from Qwen 2.5‑VL and fine‑tuned by Arcee AI for tight image‑text grounding tasks. It offers a 32 k‑token context window, enabling rich multimodal conversations that combine lengthy documents with one or more images. Training emphasi...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000018",
      "completion": "0.00000018"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1746481552
  },
  {
    "id": "arcee-ai/trinity-mini",
    "name": "Arcee AI: Trinity Mini",
    "description": "Trinity Mini is a 26B-parameter (3B active) sparse mixture-of-experts language model featuring 128 experts with 8 active per token. Engineered for efficient reasoning over long contexts (131k) with robust function calling and multi-step agent workflows.",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.000000045",
      "completion": "0.00000015"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1764601720
  },
  {
    "id": "arcee-ai/trinity-mini:free",
    "name": "Arcee AI: Trinity Mini (free)",
    "description": "Trinity Mini is a 26B-parameter (3B active) sparse mixture-of-experts language model featuring 128 experts with 8 active per token. Engineered for efficient reasoning over long contexts (131k) with robust function calling and multi-step agent workflows.",
    "context_length": 131072,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1764601720
  },
  {
    "id": "arcee-ai/virtuoso-large",
    "name": "Arcee AI: Virtuoso Large",
    "description": "Virtuoso‑Large is Arcee's top‑tier general‑purpose LLM at 72 B parameters, tuned to tackle cross‑domain reasoning, creative writing and enterprise QA. Unlike many 70 B peers, it retains the 128 k context inherited from Qwen 2.5, letting it ingest books, codebases or financial filings wholesale. T...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000075",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1746478885
  },
  {
    "id": "arliai/qwq-32b-arliai-rpr-v1",
    "name": "ArliAI: QwQ 32B RpR v1",
    "description": "QwQ-32B-ArliAI-RpR-v1 is a 32B parameter model fine-tuned from Qwen/QwQ-32B using a curated creative writing and roleplay dataset originally developed for the RPMax series. It is designed to maintain coherence and reasoning across long multi-turn conversations by introducing explicit reasoning st...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000003",
      "completion": "0.00000011"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other",
      "instruct_type": "deepseek-r1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1744555982
  },
  {
    "id": "openrouter/auto",
    "name": "Auto Router",
    "description": "Your prompt will be processed by a meta-model and routed to one of dozens of models (see below), optimizing for the best possible output.\n\nTo see which model was used, visit [Activity](/activity), or read the `model` attribute of the response. Your response will be priced at the same rate as the ...",
    "context_length": 2000000,
    "pricing": {
      "prompt": "-1",
      "completion": "-1"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Router"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1699401600
  },
  {
    "id": "baidu/ernie-4.5-21b-a3b",
    "name": "Baidu: ERNIE 4.5 21B A3B",
    "description": "A sophisticated text-based Mixture-of-Experts (MoE) model featuring 21B total parameters with 3B activated per token, delivering exceptional multimodal understanding and generation through heterogeneous MoE structures and modality-isolated routing. Supporting an extensive 131K token context lengt...",
    "context_length": 120000,
    "pricing": {
      "prompt": "0.00000007",
      "completion": "0.00000028"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1755034167
  },
  {
    "id": "baidu/ernie-4.5-21b-a3b-thinking",
    "name": "Baidu: ERNIE 4.5 21B A3B Thinking",
    "description": "ERNIE-4.5-21B-A3B-Thinking is Baidu's upgraded lightweight MoE model, refined to boost reasoning depth and quality for top-tier performance in logical puzzles, math, science, coding, text generation, and expert-level academic benchmarks.",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000007",
      "completion": "0.00000028"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1760048887
  },
  {
    "id": "baidu/ernie-4.5-300b-a47b",
    "name": "Baidu: ERNIE 4.5 300B A47B ",
    "description": "ERNIE-4.5-300B-A47B is a 300B parameter Mixture-of-Experts (MoE) language model developed by Baidu as part of the ERNIE 4.5 series. It activates 47B parameters per token and supports text generation in both English and Chinese. Optimized for high-throughput inference and efficient scaling, it use...",
    "context_length": 123000,
    "pricing": {
      "prompt": "0.00000028",
      "completion": "0.0000011"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1751300139
  },
  {
    "id": "baidu/ernie-4.5-vl-28b-a3b",
    "name": "Baidu: ERNIE 4.5 VL 28B A3B",
    "description": "A powerful multimodal Mixture-of-Experts chat model featuring 28B total parameters with 3B activated per token, delivering exceptional text and vision understanding through its innovative heterogeneous MoE structure with modality-isolated routing. Built with scaling-efficient infrastructure for h...",
    "context_length": 30000,
    "pricing": {
      "prompt": "0.00000014",
      "completion": "0.00000056"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1755032836
  },
  {
    "id": "baidu/ernie-4.5-vl-424b-a47b",
    "name": "Baidu: ERNIE 4.5 VL 424B A47B ",
    "description": "ERNIE-4.5-VL-424B-A47B is a multimodal Mixture-of-Experts (MoE) model from Baidu’s ERNIE 4.5 series, featuring 424B total parameters with 47B active per token. It is trained jointly on text and image data using a heterogeneous MoE architecture and modality-isolated routing to enable high-fidelity...",
    "context_length": 123000,
    "pricing": {
      "prompt": "0.00000042",
      "completion": "0.00000125"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1751300903
  },
  {
    "id": "openrouter/bodybuilder",
    "name": "Body Builder (beta)",
    "description": "Transform your natural language requests into structured OpenRouter API request objects. Describe what you want to accomplish with AI models, and Body Builder will construct the appropriate API calls. Example: \"count to 10 using gemini and opus.\"\n\nThis is useful for creating multi-model requests,...",
    "context_length": 128000,
    "pricing": {
      "prompt": "-1",
      "completion": "-1"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Router"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1764903653
  },
  {
    "id": "bytedance-seed/seed-1.6",
    "name": "ByteDance Seed: Seed 1.6",
    "description": "Seed 1.6 is a general-purpose model released by the ByteDance Seed team. It incorporates multimodal capabilities and adaptive deep thinking with a 256K context window.",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.00000025",
      "completion": "0.000002"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1766504997
  },
  {
    "id": "bytedance-seed/seed-1.6-flash",
    "name": "ByteDance Seed: Seed 1.6 Flash",
    "description": "Seed 1.6 Flash is an ultra-fast multimodal deep thinking model by ByteDance Seed, supporting both text and visual understanding. It features a 256k context window and can generate outputs of up to 16k tokens.",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.000000075",
      "completion": "0.0000003"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1766505011
  },
  {
    "id": "bytedance/ui-tars-1.5-7b",
    "name": "ByteDance: UI-TARS 7B ",
    "description": "UI-TARS-1.5 is a multimodal vision-language agent optimized for GUI-based environments, including desktop interfaces, web browsers, mobile systems, and games. Built by ByteDance, it builds upon the UI-TARS framework with reinforcement learning-based reasoning, enabling robust action planning and ...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000002"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1753205056
  },
  {
    "id": "deepcogito/cogito-v2-preview-llama-109b-moe",
    "name": "Cogito V2 Preview Llama 109B",
    "description": "An instruction-tuned, hybrid-reasoning Mixture-of-Experts model built on Llama-4-Scout-17B-16E. Cogito v2 can answer directly or engage an extended “thinking” phase, with alignment guided by Iterated Distillation & Amplification (IDA). It targets coding, STEM, instruction following, and general h...",
    "context_length": 32767,
    "pricing": {
      "prompt": "0.00000018",
      "completion": "0.00000059"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama4"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1756831568
  },
  {
    "id": "cohere/command-a",
    "name": "Cohere: Command A",
    "description": "Command A is an open-weights 111B parameter model with a 256k context window focused on delivering great performance across agentic, multilingual, and coding use cases.\nCompared to other leading proprietary and open-weights models Command A delivers maximum performance with minimum hardware costs...",
    "context_length": 256000,
    "pricing": {
      "prompt": "0.0000025",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1741894342
  },
  {
    "id": "cohere/command-r-08-2024",
    "name": "Cohere: Command R (08-2024)",
    "description": "command-r-08-2024 is an update of the [Command R](/models/cohere/command-r) with improved performance for multilingual retrieval-augmented generation (RAG) and tool use. More broadly, it is better at math, code and reasoning and is competitive with the previous version of the larger Command R+ mo...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00000015",
      "completion": "0.0000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Cohere"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1724976000
  },
  {
    "id": "cohere/command-r-plus-08-2024",
    "name": "Cohere: Command R+ (08-2024)",
    "description": "command-r-plus-08-2024 is an update of the [Command R+](/models/cohere/command-r-plus) with roughly 50% higher throughput and 25% lower latencies as compared to the previous Command R+ version, while keeping the hardware footprint the same.\n\nRead the launch post [here](https://docs.cohere.com/cha...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.0000025",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Cohere"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1724976000
  },
  {
    "id": "cohere/command-r7b-12-2024",
    "name": "Cohere: Command R7B (12-2024)",
    "description": "Command R7B (12-2024) is a small, fast update of the Command R+ model, delivered in December 2024. It excels at RAG, tool use, agents, and similar tasks requiring complex reasoning and multiple steps.\n\nUse of this model is subject to Cohere's [Usage Policy](https://docs.cohere.com/docs/usage-poli...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.0000000375",
      "completion": "0.00000015"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Cohere"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1734158152
  },
  {
    "id": "deepcogito/cogito-v2-preview-llama-405b",
    "name": "Deep Cogito: Cogito V2 Preview Llama 405B",
    "description": "Cogito v2 405B is a dense hybrid reasoning model that combines direct answering capabilities with advanced self-reflection. It represents a significant step toward frontier intelligence with dense architecture delivering performance competitive with leading closed models. This advanced reasoning ...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.0000035",
      "completion": "0.0000035"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1760709933
  },
  {
    "id": "deepcogito/cogito-v2-preview-llama-70b",
    "name": "Deep Cogito: Cogito V2 Preview Llama 70B",
    "description": "Cogito v2 70B is a dense hybrid reasoning model that combines direct answering capabilities with advanced self-reflection. Built with iterative policy improvement, it delivers strong performance across reasoning tasks while maintaining efficiency through shorter reasoning chains and improved intu...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000088",
      "completion": "0.00000088"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1756831784
  },
  {
    "id": "deepcogito/cogito-v2.1-671b",
    "name": "Deep Cogito: Cogito v2.1 671B",
    "description": "Cogito v2.1 671B MoE represents one of the strongest open models globally, matching performance of frontier closed and open models. This model is trained using self play with reinforcement learning to reach state-of-the-art performance on multiple categories (instruction following, coding, longer...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00000125",
      "completion": "0.00000125"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1763071233
  },
  {
    "id": "deepseek/deepseek-prover-v2",
    "name": "DeepSeek: DeepSeek Prover V2",
    "description": "DeepSeek Prover V2 is a 671B parameter model, speculated to be geared towards logic and mathematics. Likely an upgrade from [DeepSeek-Prover-V1.5](https://huggingface.co/deepseek-ai/DeepSeek-Prover-V1.5-RL) Not much is known about the model yet, as DeepSeek released it on Hugging Face without an ...",
    "context_length": 163840,
    "pricing": {
      "prompt": "0.0000005",
      "completion": "0.00000218"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1746013094
  },
  {
    "id": "deepseek/deepseek-r1-0528-qwen3-8b",
    "name": "DeepSeek: DeepSeek R1 0528 Qwen3 8B",
    "description": "DeepSeek-R1-0528 is a lightly upgraded release of DeepSeek R1 that taps more compute and smarter post-training tricks, pushing its reasoning and inference to the brink of flagship models like O3 and Gemini 2.5 Pro.\nIt now tops math, programming, and logic leaderboards, showcasing a step-change in...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00000006",
      "completion": "0.00000009"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen",
      "instruct_type": "deepseek-r1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1748538543
  },
  {
    "id": "deepseek/deepseek-chat",
    "name": "DeepSeek: DeepSeek V3",
    "description": "DeepSeek-V3 is the latest model from the DeepSeek team, building upon the instruction following and coding abilities of the previous versions. Pre-trained on nearly 15 trillion tokens, the reported evaluations reveal that the model outperforms other open-source models and rivals leading closed-so...",
    "context_length": 163840,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1735241320
  },
  {
    "id": "deepseek/deepseek-chat-v3-0324",
    "name": "DeepSeek: DeepSeek V3 0324",
    "description": "DeepSeek V3, a 685B-parameter, mixture-of-experts model, is the latest iteration of the flagship chat model family from the DeepSeek team.\n\nIt succeeds the [DeepSeek V3](/deepseek/deepseek-chat-v3) model and performs really well on a variety of tasks.",
    "context_length": 163840,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.00000088"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1742824755
  },
  {
    "id": "deepseek/deepseek-chat-v3.1",
    "name": "DeepSeek: DeepSeek V3.1",
    "description": "DeepSeek-V3.1 is a large hybrid reasoning model (671B parameters, 37B active) that supports both thinking and non-thinking modes via prompt templates. It extends the DeepSeek-V3 base with a two-phase long-context training process, reaching up to 128K tokens, and uses FP8 microscaling for efficien...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000015",
      "completion": "0.00000075"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek",
      "instruct_type": "deepseek-v3.1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1755779628
  },
  {
    "id": "deepseek/deepseek-v3.1-terminus",
    "name": "DeepSeek: DeepSeek V3.1 Terminus",
    "description": "DeepSeek-V3.1 Terminus is an update to [DeepSeek V3.1](/deepseek/deepseek-chat-v3.1) that maintains the model's original capabilities while addressing issues reported by users, including language consistency and agent capabilities, further optimizing the model's performance in coding and search a...",
    "context_length": 163840,
    "pricing": {
      "prompt": "0.00000021",
      "completion": "0.00000079"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek",
      "instruct_type": "deepseek-v3.1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1758548275
  },
  {
    "id": "deepseek/deepseek-v3.1-terminus:exacto",
    "name": "DeepSeek: DeepSeek V3.1 Terminus (exacto)",
    "description": "DeepSeek-V3.1 Terminus is an update to [DeepSeek V3.1](/deepseek/deepseek-chat-v3.1) that maintains the model's original capabilities while addressing issues reported by users, including language consistency and agent capabilities, further optimizing the model's performance in coding and search a...",
    "context_length": 163840,
    "pricing": {
      "prompt": "0.00000021",
      "completion": "0.00000079"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek",
      "instruct_type": "deepseek-v3.1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1758548275
  },
  {
    "id": "deepseek/deepseek-v3.2",
    "name": "DeepSeek: DeepSeek V3.2",
    "description": "DeepSeek-V3.2 is a large language model designed to harmonize high computational efficiency with strong reasoning and agentic tool-use performance. It introduces DeepSeek Sparse Attention (DSA), a fine-grained sparse attention mechanism that reduces training and inference cost while preserving qu...",
    "context_length": 163840,
    "pricing": {
      "prompt": "0.00000025",
      "completion": "0.00000038"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1764594642
  },
  {
    "id": "deepseek/deepseek-v3.2-exp",
    "name": "DeepSeek: DeepSeek V3.2 Exp",
    "description": "DeepSeek-V3.2-Exp is an experimental large language model released by DeepSeek as an intermediate step between V3.1 and future architectures. It introduces DeepSeek Sparse Attention (DSA), a fine-grained sparse attention mechanism designed to improve training and inference efficiency in long-cont...",
    "context_length": 163840,
    "pricing": {
      "prompt": "0.00000021",
      "completion": "0.00000032"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek",
      "instruct_type": "deepseek-v3.1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1759150481
  },
  {
    "id": "deepseek/deepseek-v3.2-speciale",
    "name": "DeepSeek: DeepSeek V3.2 Speciale",
    "description": "DeepSeek-V3.2-Speciale is a high-compute variant of DeepSeek-V3.2 optimized for maximum reasoning and agentic performance. It builds on DeepSeek Sparse Attention (DSA) for efficient long-context processing, then scales post-training reinforcement learning to push capability beyond the base model....",
    "context_length": 163840,
    "pricing": {
      "prompt": "0.00000027",
      "completion": "0.00000041"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1764594837
  },
  {
    "id": "deepseek/deepseek-r1",
    "name": "DeepSeek: R1",
    "description": "DeepSeek R1 is here: Performance on par with [OpenAI o1](/openai/o1), but open-sourced and with fully open reasoning tokens. It's 671B parameters in size, with 37B active in an inference pass.\n\nFully open-source model & [technical report](https://api-docs.deepseek.com/news/news250120).\n\nMIT licen...",
    "context_length": 163840,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek",
      "instruct_type": "deepseek-r1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1737381095
  },
  {
    "id": "deepseek/deepseek-r1-0528",
    "name": "DeepSeek: R1 0528",
    "description": "May 28th update to the [original DeepSeek R1](/deepseek/deepseek-r1) Performance on par with [OpenAI o1](/openai/o1), but open-sourced and with fully open reasoning tokens. It's 671B parameters in size, with 37B active in an inference pass.\n\nFully open-source model.",
    "context_length": 163840,
    "pricing": {
      "prompt": "0.0000004",
      "completion": "0.00000175"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek",
      "instruct_type": "deepseek-r1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1748455170
  },
  {
    "id": "deepseek/deepseek-r1-0528:free",
    "name": "DeepSeek: R1 0528 (free)",
    "description": "May 28th update to the [original DeepSeek R1](/deepseek/deepseek-r1) Performance on par with [OpenAI o1](/openai/o1), but open-sourced and with fully open reasoning tokens. It's 671B parameters in size, with 37B active in an inference pass.\n\nFully open-source model.",
    "context_length": 163840,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek",
      "instruct_type": "deepseek-r1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1748455170
  },
  {
    "id": "deepseek/deepseek-r1-distill-llama-70b",
    "name": "DeepSeek: R1 Distill Llama 70B",
    "description": "DeepSeek R1 Distill Llama 70B is a distilled large language model based on [Llama-3.3-70B-Instruct](/meta-llama/llama-3.3-70b-instruct), using outputs from [DeepSeek R1](/deepseek/deepseek-r1). The model combines advanced distillation techniques to achieve high performance across multiple benchma...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000003",
      "completion": "0.00000011"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "deepseek-r1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1737663169
  },
  {
    "id": "deepseek/deepseek-r1-distill-qwen-14b",
    "name": "DeepSeek: R1 Distill Qwen 14B",
    "description": "DeepSeek R1 Distill Qwen 14B is a distilled large language model based on [Qwen 2.5 14B](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B), using outputs from [DeepSeek R1](/deepseek/deepseek-r1). It outperforms OpenAI's o1-mini across various benchmarks, achieving new state-of-the...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000015",
      "completion": "0.00000015"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen",
      "instruct_type": "deepseek-r1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738193940
  },
  {
    "id": "deepseek/deepseek-r1-distill-qwen-32b",
    "name": "DeepSeek: R1 Distill Qwen 32B",
    "description": "DeepSeek R1 Distill Qwen 32B is a distilled large language model based on [Qwen 2.5 32B](https://huggingface.co/Qwen/Qwen2.5-32B), using outputs from [DeepSeek R1](/deepseek/deepseek-r1). It outperforms OpenAI's o1-mini across various benchmarks, achieving new state-of-the-art results for dense m...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000027",
      "completion": "0.00000027"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen",
      "instruct_type": "deepseek-r1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738194830
  },
  {
    "id": "eleutherai/llemma_7b",
    "name": "EleutherAI: Llemma 7b",
    "description": "Llemma 7B is a language model for mathematics. It was initialized with Code Llama 7B weights, and trained on the Proof-Pile-2 for 200B tokens. Llemma models are particularly strong at chain-of-thought mathematical reasoning and using computational tools for mathematics, such as Python and formal ...",
    "context_length": 4096,
    "pricing": {
      "prompt": "0.0000008",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other",
      "instruct_type": "code-llama"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1744643225
  },
  {
    "id": "essentialai/rnj-1-instruct",
    "name": "EssentialAI: Rnj 1 Instruct",
    "description": "Rnj-1 is an 8B-parameter, dense, open-weight model family developed by Essential AI and trained from scratch with a focus on programming, math, and scientific reasoning. The model demonstrates strong performance across multiple programming languages, tool-use workflows, and agentic execution envi...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000015",
      "completion": "0.00000015"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1765094847
  },
  {
    "id": "alpindale/goliath-120b",
    "name": "Goliath 120B",
    "description": "A large LLM created by combining two fine-tuned Llama 70B models into one 120B model. Combines Xwin and Euryale.\n\nCredits to\n- [@chargoddard](https://huggingface.co/chargoddard) for developing the framework used to merge the model - [mergekit](https://github.com/cg123/mergekit).\n- [@Undi95](https...",
    "context_length": 6144,
    "pricing": {
      "prompt": "0.000006",
      "completion": "0.000008"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama2",
      "instruct_type": "airoboros"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1699574400
  },
  {
    "id": "google/gemini-2.0-flash-001",
    "name": "Google: Gemini 2.0 Flash",
    "description": "Gemini Flash 2.0 offers a significantly faster time to first token (TTFT) compared to [Gemini Flash 1.5](/google/gemini-flash-1.5), while maintaining quality on par with larger models like [Gemini Pro 1.5](/google/gemini-pro-1.5). It introduces notable enhancements in multimodal understanding, co...",
    "context_length": 1048576,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000004"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file",
        "audio",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738769413
  },
  {
    "id": "google/gemini-2.0-flash-exp:free",
    "name": "Google: Gemini 2.0 Flash Experimental (free)",
    "description": "Gemini Flash 2.0 offers a significantly faster time to first token (TTFT) compared to [Gemini Flash 1.5](/google/gemini-flash-1.5), while maintaining quality on par with larger models like [Gemini Pro 1.5](/google/gemini-pro-1.5). It introduces notable enhancements in multimodal understanding, co...",
    "context_length": 1048576,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1733937523
  },
  {
    "id": "google/gemini-2.0-flash-lite-001",
    "name": "Google: Gemini 2.0 Flash Lite",
    "description": "Gemini 2.0 Flash Lite offers a significantly faster time to first token (TTFT) compared to [Gemini Flash 1.5](/google/gemini-flash-1.5), while maintaining quality on par with larger models like [Gemini Pro 1.5](/google/gemini-pro-1.5), all at extremely economical token prices.",
    "context_length": 1048576,
    "pricing": {
      "prompt": "0.000000075",
      "completion": "0.0000003"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file",
        "audio",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1740506212
  },
  {
    "id": "google/gemini-2.5-flash",
    "name": "Google: Gemini 2.5 Flash",
    "description": "Gemini 2.5 Flash is Google's state-of-the-art workhorse model, specifically designed for advanced reasoning, coding, mathematics, and scientific tasks. It includes built-in \"thinking\" capabilities, enabling it to provide responses with greater accuracy and nuanced context handling. \n\nAdditionally...",
    "context_length": 1048576,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000025"
    },
    "architecture": {
      "input_modalities": [
        "file",
        "image",
        "text",
        "audio",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1750172488
  },
  {
    "id": "google/gemini-2.5-flash-image",
    "name": "Google: Gemini 2.5 Flash Image (Nano Banana)",
    "description": "Gemini 2.5 Flash Image, a.k.a. \"Nano Banana,\" is now generally available. It is a state of the art image generation model with contextual understanding. It is capable of image generation, edits, and multi-turn conversations. Aspect ratios can be controlled with the [image_config API Parameter](ht...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000025"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "image",
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1759870431
  },
  {
    "id": "google/gemini-2.5-flash-image-preview",
    "name": "Google: Gemini 2.5 Flash Image Preview (Nano Banana)",
    "description": "Gemini 2.5 Flash Image Preview, a.k.a. \"Nano Banana,\" is a state of the art image generation model with contextual understanding. It is capable of image generation, edits, and multi-turn conversations.",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000025"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "image",
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1756218977
  },
  {
    "id": "google/gemini-2.5-flash-lite",
    "name": "Google: Gemini 2.5 Flash Lite",
    "description": "Gemini 2.5 Flash-Lite is a lightweight reasoning model in the Gemini 2.5 family, optimized for ultra-low latency and cost efficiency. It offers improved throughput, faster token generation, and better performance across common benchmarks compared to earlier Flash models. By default, \"thinking\" (i...",
    "context_length": 1048576,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000004"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file",
        "audio",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1753200276
  },
  {
    "id": "google/gemini-2.5-flash-lite-preview-09-2025",
    "name": "Google: Gemini 2.5 Flash Lite Preview 09-2025",
    "description": "Gemini 2.5 Flash-Lite is a lightweight reasoning model in the Gemini 2.5 family, optimized for ultra-low latency and cost efficiency. It offers improved throughput, faster token generation, and better performance across common benchmarks compared to earlier Flash models. By default, \"thinking\" (i...",
    "context_length": 1048576,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000004"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file",
        "audio",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1758819686
  },
  {
    "id": "google/gemini-2.5-flash-preview-09-2025",
    "name": "Google: Gemini 2.5 Flash Preview 09-2025",
    "description": "Gemini 2.5 Flash Preview September 2025 Checkpoint is Google's state-of-the-art workhorse model, specifically designed for advanced reasoning, coding, mathematics, and scientific tasks. It includes built-in \"thinking\" capabilities, enabling it to provide responses with greater accuracy and nuance...",
    "context_length": 1048576,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000025"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "file",
        "text",
        "audio",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1758820178
  },
  {
    "id": "google/gemini-2.5-pro",
    "name": "Google: Gemini 2.5 Pro",
    "description": "Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. It employs “thinking” capabilities, enabling it to reason through responses with enhanced accuracy and nuanced context handling. Gemini 2.5 Pro achieves top-tier perfor...",
    "context_length": 1048576,
    "pricing": {
      "prompt": "0.00000125",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file",
        "audio",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1750169544
  },
  {
    "id": "google/gemini-2.5-pro-preview-05-06",
    "name": "Google: Gemini 2.5 Pro Preview 05-06",
    "description": "Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. It employs “thinking” capabilities, enabling it to reason through responses with enhanced accuracy and nuanced context handling. Gemini 2.5 Pro achieves top-tier perfor...",
    "context_length": 1048576,
    "pricing": {
      "prompt": "0.00000125",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file",
        "audio",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1746578513
  },
  {
    "id": "google/gemini-2.5-pro-preview",
    "name": "Google: Gemini 2.5 Pro Preview 06-05",
    "description": "Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. It employs “thinking” capabilities, enabling it to reason through responses with enhanced accuracy and nuanced context handling. Gemini 2.5 Pro achieves top-tier perfor...",
    "context_length": 1048576,
    "pricing": {
      "prompt": "0.00000125",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "file",
        "image",
        "text",
        "audio"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1749137257
  },
  {
    "id": "google/gemini-3-flash-preview",
    "name": "Google: Gemini 3 Flash Preview",
    "description": "Gemini 3 Flash Preview is a high speed, high value thinking model designed for agentic workflows, multi turn chat, and coding assistance. It delivers near Pro level reasoning and tool use performance with substantially lower latency than larger Gemini variants, making it well suited for interacti...",
    "context_length": 1048576,
    "pricing": {
      "prompt": "0.0000005",
      "completion": "0.000003"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file",
        "audio",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1765987078
  },
  {
    "id": "google/gemini-3-pro-preview",
    "name": "Google: Gemini 3 Pro Preview",
    "description": "Gemini 3 Pro is Google’s flagship frontier model for high-precision multimodal reasoning, combining strong performance across text, image, video, audio, and code with a 1M-token context window. Reasoning Details must be preserved when using multi-turn tool calling, see our docs here: https://open...",
    "context_length": 1048576,
    "pricing": {
      "prompt": "0.000002",
      "completion": "0.000012"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file",
        "audio",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1763474668
  },
  {
    "id": "google/gemma-2-27b-it",
    "name": "Google: Gemma 2 27B",
    "description": "Gemma 2 27B by Google is an open model built from the same research and technology used to create the [Gemini models](/models?q=gemini).\n\nGemma models are well-suited for a variety of text generation tasks, including question answering, summarization, and reasoning.\n\nSee the [launch announcement]...",
    "context_length": 8192,
    "pricing": {
      "prompt": "0.00000065",
      "completion": "0.00000065"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini",
      "instruct_type": "gemma"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1720828800
  },
  {
    "id": "google/gemma-2-9b-it",
    "name": "Google: Gemma 2 9B",
    "description": "Gemma 2 9B by Google is an advanced, open-source language model that sets a new standard for efficiency and performance in its size class.\n\nDesigned for a wide variety of tasks, it empowers developers and researchers to build innovative applications, while maintaining accessibility, safety, and c...",
    "context_length": 8192,
    "pricing": {
      "prompt": "0.00000003",
      "completion": "0.00000009"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini",
      "instruct_type": "gemma"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1719532800
  },
  {
    "id": "google/gemma-3-12b-it",
    "name": "Google: Gemma 3 12B",
    "description": "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities, including structured outputs and function calling. Gemma 3 12B is the seco...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000003",
      "completion": "0.0000001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini",
      "instruct_type": "gemma"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1741902625
  },
  {
    "id": "google/gemma-3-12b-it:free",
    "name": "Google: Gemma 3 12B (free)",
    "description": "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities, including structured outputs and function calling. Gemma 3 12B is the seco...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini",
      "instruct_type": "gemma"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1741902625
  },
  {
    "id": "google/gemma-3-27b-it",
    "name": "Google: Gemma 3 27B",
    "description": "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities, including structured outputs and function calling. Gemma 3 27B is Google's...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.000000036",
      "completion": "0.000000064"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini",
      "instruct_type": "gemma"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1741756359
  },
  {
    "id": "google/gemma-3-27b-it:free",
    "name": "Google: Gemma 3 27B (free)",
    "description": "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities, including structured outputs and function calling. Gemma 3 27B is Google's...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini",
      "instruct_type": "gemma"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1741756359
  },
  {
    "id": "google/gemma-3-4b-it",
    "name": "Google: Gemma 3 4B",
    "description": "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities, including structured outputs and function calling.",
    "context_length": 96000,
    "pricing": {
      "prompt": "0.00000001703012",
      "completion": "0.0000000681536"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini",
      "instruct_type": "gemma"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1741905510
  },
  {
    "id": "google/gemma-3-4b-it:free",
    "name": "Google: Gemma 3 4B (free)",
    "description": "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities, including structured outputs and function calling.",
    "context_length": 32768,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Gemini",
      "instruct_type": "gemma"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1741905510
  },
  {
    "id": "google/gemma-3n-e2b-it:free",
    "name": "Google: Gemma 3n 2B (free)",
    "description": "Gemma 3n E2B IT is a multimodal, instruction-tuned model developed by Google DeepMind, designed to operate efficiently at an effective parameter size of 2B while leveraging a 6B architecture. Based on the MatFormer architecture, it supports nested submodels and modular composition via the Mix-and...",
    "context_length": 8192,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1752074904
  },
  {
    "id": "google/gemma-3n-e4b-it",
    "name": "Google: Gemma 3n 4B",
    "description": "Gemma 3n E4B-it is optimized for efficient execution on mobile and low-resource devices, such as phones, laptops, and tablets. It supports multimodal inputs—including text, visual data, and audio—enabling diverse tasks such as text generation, speech recognition, translation, and image analysis. ...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000002",
      "completion": "0.00000004"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1747776824
  },
  {
    "id": "google/gemma-3n-e4b-it:free",
    "name": "Google: Gemma 3n 4B (free)",
    "description": "Gemma 3n E4B-it is optimized for efficient execution on mobile and low-resource devices, such as phones, laptops, and tablets. It supports multimodal inputs—including text, visual data, and audio—enabling diverse tasks such as text generation, speech recognition, translation, and image analysis. ...",
    "context_length": 8192,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1747776824
  },
  {
    "id": "google/gemini-3-pro-image-preview",
    "name": "Google: Nano Banana Pro (Gemini 3 Pro Image Preview)",
    "description": "Nano Banana Pro is Google’s most advanced image-generation and editing model, built on Gemini 3 Pro. It extends the original Nano Banana with significantly improved multimodal reasoning, real-world grounding, and high-fidelity visual synthesis. The model generates context-rich graphics, from info...",
    "context_length": 65536,
    "pricing": {
      "prompt": "0.000002",
      "completion": "0.000012"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "image",
        "text"
      ],
      "tokenizer": "Gemini"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1763653797
  },
  {
    "id": "ibm-granite/granite-4.0-h-micro",
    "name": "IBM: Granite 4.0 Micro",
    "description": "Granite-4.0-H-Micro is a 3B parameter from the Granite 4 family of models. These models are the latest in a series of models released by IBM. They are fine-tuned for long context tool calling. ",
    "context_length": 131000,
    "pricing": {
      "prompt": "0.000000017",
      "completion": "0.00000011"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1760927695
  },
  {
    "id": "inception/mercury",
    "name": "Inception: Mercury",
    "description": "Mercury is the first diffusion large language model (dLLM). Applying a breakthrough discrete diffusion approach, the model runs 5-10x faster than even speed optimized models like GPT-4.1 Nano and Claude 3.5 Haiku while matching their performance. Mercury's speed enables developers to provide resp...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00000025",
      "completion": "0.000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1750973026
  },
  {
    "id": "inception/mercury-coder",
    "name": "Inception: Mercury Coder",
    "description": "Mercury Coder is the first diffusion large language model (dLLM). Applying a breakthrough discrete diffusion approach, the model runs 5-10x faster than even speed optimized models like Claude 3.5 Haiku and GPT-4o Mini while matching their performance. Mercury Coder's speed means that developers c...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00000025",
      "completion": "0.000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1746033880
  },
  {
    "id": "inflection/inflection-3-pi",
    "name": "Inflection: Inflection 3 Pi",
    "description": "Inflection 3 Pi powers Inflection's [Pi](https://pi.ai) chatbot, including backstory, emotional intelligence, productivity, and safety. It has access to recent news, and excels in scenarios like customer support and roleplay.\n\nPi has been trained to mirror your tone and style, if you use more emo...",
    "context_length": 8000,
    "pricing": {
      "prompt": "0.0000025",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1728604800
  },
  {
    "id": "inflection/inflection-3-productivity",
    "name": "Inflection: Inflection 3 Productivity",
    "description": "Inflection 3 Productivity is optimized for following instructions. It is better for tasks requiring JSON output or precise adherence to provided guidelines. It has access to recent news.\n\nFor emotional intelligence similar to Pi, see [Inflect 3 Pi](/inflection/inflection-3-pi)\n\nSee [Inflection's ...",
    "context_length": 8000,
    "pricing": {
      "prompt": "0.0000025",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1728604800
  },
  {
    "id": "kwaipilot/kat-coder-pro:free",
    "name": "Kwaipilot: KAT-Coder-Pro V1 (free)",
    "description": "KAT-Coder-Pro V1 is KwaiKAT's most advanced agentic coding model in the KAT-Coder series. Designed specifically for agentic coding tasks, it excels in real-world software engineering scenarios, achieving 73.4% solve rate on the SWE-Bench Verified benchmark. \n\nThe model has been optimized for tool...",
    "context_length": 256000,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1762745912
  },
  {
    "id": "liquid/lfm-2.2-6b",
    "name": "LiquidAI/LFM2-2.6B",
    "description": "LFM2 is a new generation of hybrid models developed by Liquid AI, specifically designed for edge AI and on-device deployment. It sets a new standard in terms of quality, speed, and memory efficiency.",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000005",
      "completion": "0.0000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1760970889
  },
  {
    "id": "liquid/lfm2-8b-a1b",
    "name": "LiquidAI/LFM2-8B-A1B",
    "description": "Model created via inbox interface",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000005",
      "completion": "0.0000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1760970984
  },
  {
    "id": "meta-llama/llama-guard-3-8b",
    "name": "Llama Guard 3 8B",
    "description": "Llama Guard 3 is a Llama-3.1-8B pretrained model, fine-tuned for content safety classification. Similar to previous versions, it can be used to classify content in both LLM inputs (prompt classification) and in LLM responses (response classification). It acts as an LLM – it generates text in its ...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000002",
      "completion": "0.00000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "none"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1739401318
  },
  {
    "id": "anthracite-org/magnum-v4-72b",
    "name": "Magnum v4 72B",
    "description": "This is a series of models designed to replicate the prose quality of the Claude 3 models, specifically Sonnet(https://openrouter.ai/anthropic/claude-3.5-sonnet) and Opus(https://openrouter.ai/anthropic/claude-3-opus).\n\nThe model is fine-tuned on top of [Qwen2.5 72B](https://openrouter.ai/qwen/qw...",
    "context_length": 16384,
    "pricing": {
      "prompt": "0.000003",
      "completion": "0.000005"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen",
      "instruct_type": "chatml"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1729555200
  },
  {
    "id": "mancer/weaver",
    "name": "Mancer: Weaver (alpha)",
    "description": "An attempt to recreate Claude-style verbosity, but don't expect the same level of coherence or memory. Meant for use in roleplay/narrative situations.",
    "context_length": 8000,
    "pricing": {
      "prompt": "0.00000075",
      "completion": "0.000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama2",
      "instruct_type": "alpaca"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1690934400
  },
  {
    "id": "meituan/longcat-flash-chat",
    "name": "Meituan: LongCat Flash Chat",
    "description": "LongCat-Flash-Chat is a large-scale Mixture-of-Experts (MoE) model with 560B total parameters, of which 18.6B–31.3B (≈27B on average) are dynamically activated per input. It introduces a shortcut-connected MoE design to reduce communication overhead and achieve high throughput while maintaining t...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000008"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1757427658
  },
  {
    "id": "meta-llama/llama-3-70b-instruct",
    "name": "Meta: Llama 3 70B Instruct",
    "description": "Meta's latest class of model (Llama 3) launched with a variety of sizes & flavors. This 70B instruct-tuned version was optimized for high quality dialogue usecases.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the model...",
    "context_length": 8192,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000004"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1713398400
  },
  {
    "id": "meta-llama/llama-3-8b-instruct",
    "name": "Meta: Llama 3 8B Instruct",
    "description": "Meta's latest class of model (Llama 3) launched with a variety of sizes & flavors. This 8B instruct-tuned version was optimized for high quality dialogue usecases.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the model ...",
    "context_length": 8192,
    "pricing": {
      "prompt": "0.00000003",
      "completion": "0.00000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1713398400
  },
  {
    "id": "meta-llama/llama-3.1-405b",
    "name": "Meta: Llama 3.1 405B (base)",
    "description": "Meta's latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This is the base 405B pre-trained version.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the model release, [click here](https://ai.met...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.000004",
      "completion": "0.000004"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "none"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1722556800
  },
  {
    "id": "meta-llama/llama-3.1-405b-instruct",
    "name": "Meta: Llama 3.1 405B Instruct",
    "description": "The highly anticipated 400B class of Llama3 is here! Clocking in at 128k context with impressive eval scores, the Meta AI team continues to push the frontier of open-source LLMs.\n\nMeta's latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This 405B instruct-tuned version...",
    "context_length": 10000,
    "pricing": {
      "prompt": "0.0000035",
      "completion": "0.0000035"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1721692800
  },
  {
    "id": "meta-llama/llama-3.1-405b-instruct:free",
    "name": "Meta: Llama 3.1 405B Instruct (free)",
    "description": "The highly anticipated 400B class of Llama3 is here! Clocking in at 128k context with impressive eval scores, the Meta AI team continues to push the frontier of open-source LLMs.\n\nMeta's latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This 405B instruct-tuned version...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1721692800
  },
  {
    "id": "meta-llama/llama-3.1-70b-instruct",
    "name": "Meta: Llama 3.1 70B Instruct",
    "description": "Meta's latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This 70B instruct-tuned version is optimized for high quality dialogue usecases.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the mode...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000004",
      "completion": "0.0000004"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1721692800
  },
  {
    "id": "meta-llama/llama-3.1-8b-instruct",
    "name": "Meta: Llama 3.1 8B Instruct",
    "description": "Meta's latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This 8B instruct-tuned version is fast and efficient.\n\nIt has demonstrated strong performance compared to leading closed-source models in human evaluations.\n\nTo read more about the model release, [click here](htt...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000002",
      "completion": "0.00000003"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1721692800
  },
  {
    "id": "meta-llama/llama-3.2-11b-vision-instruct",
    "name": "Meta: Llama 3.2 11B Vision Instruct",
    "description": "Llama 3.2 11B Vision is a multimodal model with 11 billion parameters, designed to handle tasks combining visual and textual data. It excels in tasks such as image captioning and visual question answering, bridging the gap between language generation and visual reasoning. Pre-trained on a massive...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.000000049",
      "completion": "0.000000049"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1727222400
  },
  {
    "id": "meta-llama/llama-3.2-1b-instruct",
    "name": "Meta: Llama 3.2 1B Instruct",
    "description": "Llama 3.2 1B is a 1-billion-parameter language model focused on efficiently performing natural language tasks, such as summarization, dialogue, and multilingual text analysis. Its smaller size allows it to operate efficiently in low-resource environments while maintaining strong task performance....",
    "context_length": 60000,
    "pricing": {
      "prompt": "0.000000027",
      "completion": "0.0000002"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1727222400
  },
  {
    "id": "meta-llama/llama-3.2-3b-instruct",
    "name": "Meta: Llama 3.2 3B Instruct",
    "description": "Llama 3.2 3B is a 3-billion-parameter multilingual large language model, optimized for advanced natural language processing tasks like dialogue generation, reasoning, and summarization. Designed with the latest transformer architecture, it supports eight languages, including English, Spanish, and...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000002",
      "completion": "0.00000002"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1727222400
  },
  {
    "id": "meta-llama/llama-3.2-3b-instruct:free",
    "name": "Meta: Llama 3.2 3B Instruct (free)",
    "description": "Llama 3.2 3B is a 3-billion-parameter multilingual large language model, optimized for advanced natural language processing tasks like dialogue generation, reasoning, and summarization. Designed with the latest transformer architecture, it supports eight languages, including English, Spanish, and...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1727222400
  },
  {
    "id": "meta-llama/llama-3.2-90b-vision-instruct",
    "name": "Meta: Llama 3.2 90B Vision Instruct",
    "description": "The Llama 90B Vision model is a top-tier, 90-billion-parameter multimodal model designed for the most challenging visual reasoning and language tasks. It offers unparalleled accuracy in image captioning, visual question answering, and advanced image-text comprehension. Pre-trained on vast multimo...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000035",
      "completion": "0.0000004"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1727222400
  },
  {
    "id": "meta-llama/llama-3.3-70b-instruct",
    "name": "Meta: Llama 3.3 70B Instruct",
    "description": "The Meta Llama 3.3 multilingual large language model (LLM) is a pretrained and instruction tuned generative model in 70B (text in/text out). The Llama 3.3 instruction tuned text only model is optimized for multilingual dialogue use cases and outperforms many of the available open source and close...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.00000032"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1733506137
  },
  {
    "id": "meta-llama/llama-3.3-70b-instruct:free",
    "name": "Meta: Llama 3.3 70B Instruct (free)",
    "description": "The Meta Llama 3.3 multilingual large language model (LLM) is a pretrained and instruction tuned generative model in 70B (text in/text out). The Llama 3.3 instruction tuned text only model is optimized for multilingual dialogue use cases and outperforms many of the available open source and close...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1733506137
  },
  {
    "id": "meta-llama/llama-4-maverick",
    "name": "Meta: Llama 4 Maverick",
    "description": "Llama 4 Maverick 17B Instruct (128E) is a high-capacity multimodal language model from Meta, built on a mixture-of-experts (MoE) architecture with 128 experts and 17 billion active parameters per forward pass (400B total). It supports multilingual text and image input, and produces multilingual t...",
    "context_length": 1048576,
    "pricing": {
      "prompt": "0.00000015",
      "completion": "0.0000006"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama4"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1743881822
  },
  {
    "id": "meta-llama/llama-4-scout",
    "name": "Meta: Llama 4 Scout",
    "description": "Llama 4 Scout 17B Instruct (16E) is a mixture-of-experts (MoE) language model developed by Meta, activating 17 billion parameters out of a total of 109B. It supports native multimodal input (text and image) and multilingual output (text and code) across 12 supported languages. Designed for assist...",
    "context_length": 327680,
    "pricing": {
      "prompt": "0.00000008",
      "completion": "0.0000003"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama4"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1743881519
  },
  {
    "id": "meta-llama/llama-guard-4-12b",
    "name": "Meta: Llama Guard 4 12B",
    "description": "Llama Guard 4 is a Llama 4 Scout-derived multimodal pretrained model, fine-tuned for content safety classification. Similar to previous versions, it can be used to classify content in both LLM inputs (prompt classification) and in LLM responses (response classification). It acts as an LLM—generat...",
    "context_length": 163840,
    "pricing": {
      "prompt": "0.00000018",
      "completion": "0.00000018"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1745975193
  },
  {
    "id": "meta-llama/llama-guard-2-8b",
    "name": "Meta: LlamaGuard 2 8B",
    "description": "This safeguard model has 8B parameters and is based on the Llama 3 family. Just like is predecessor, [LlamaGuard 1](https://huggingface.co/meta-llama/LlamaGuard-7b), it can do both prompt and response classification.\n\nLlamaGuard 2 acts as a normal LLM would, generating text that indicates whether...",
    "context_length": 8192,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000002"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "none"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1715558400
  },
  {
    "id": "microsoft/phi-4",
    "name": "Microsoft: Phi 4",
    "description": "[Microsoft Research](/microsoft) Phi-4 is designed to perform well in complex reasoning tasks and can operate efficiently in situations with limited memory or where quick responses are needed. \n\nAt 14 billion parameters, it was trained on a mix of high-quality synthetic datasets, data from curate...",
    "context_length": 16384,
    "pricing": {
      "prompt": "0.00000006",
      "completion": "0.00000014"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1736489872
  },
  {
    "id": "microsoft/phi-4-multimodal-instruct",
    "name": "Microsoft: Phi 4 Multimodal Instruct",
    "description": "Phi-4 Multimodal Instruct is a versatile 5.6B parameter foundation model that combines advanced reasoning and instruction-following capabilities across both text and visual inputs, providing accurate text outputs. The unified architecture enables efficient, low-latency inference, suitable for edg...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000005",
      "completion": "0.0000001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1741396284
  },
  {
    "id": "microsoft/phi-4-reasoning-plus",
    "name": "Microsoft: Phi 4 Reasoning Plus",
    "description": "Phi-4-reasoning-plus is an enhanced 14B parameter model from Microsoft, fine-tuned from Phi-4 with additional reinforcement learning to boost accuracy on math, science, and code reasoning tasks. It uses the same dense decoder-only transformer architecture as Phi-4, but generates longer, more comp...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000007",
      "completion": "0.00000035"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1746130961
  },
  {
    "id": "microsoft/phi-3-medium-128k-instruct",
    "name": "Microsoft: Phi-3 Medium 128K Instruct",
    "description": "Phi-3 128K Medium is a powerful 14-billion parameter model designed for advanced language understanding, reasoning, and instruction following. Optimized through supervised fine-tuning and preference adjustments, it excels in tasks involving common sense, mathematics, logical reasoning, and code p...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.000001",
      "completion": "0.000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other",
      "instruct_type": "phi3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1716508800
  },
  {
    "id": "microsoft/phi-3-mini-128k-instruct",
    "name": "Microsoft: Phi-3 Mini 128K Instruct",
    "description": "Phi-3 Mini is a powerful 3.8B parameter model designed for advanced language understanding, reasoning, and instruction following. Optimized through supervised fine-tuning and preference adjustments, it excels in tasks involving common sense, mathematics, logical reasoning, and code processing.\n\nA...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other",
      "instruct_type": "phi3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1716681600
  },
  {
    "id": "microsoft/phi-3.5-mini-128k-instruct",
    "name": "Microsoft: Phi-3.5 Mini 128K Instruct",
    "description": "Phi-3.5 models are lightweight, state-of-the-art open models. These models were trained with Phi-3 datasets that include both synthetic data and the filtered, publicly available websites data, with a focus on high quality and reasoning-dense properties. Phi-3.5 Mini uses 3.8B parameters, and is a...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other",
      "instruct_type": "phi3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1724198400
  },
  {
    "id": "minimax/minimax-m1",
    "name": "MiniMax: MiniMax M1",
    "description": "MiniMax-M1 is a large-scale, open-weight reasoning model designed for extended context and high-efficiency inference. It leverages a hybrid Mixture-of-Experts (MoE) architecture paired with a custom \"lightning attention\" mechanism, allowing it to process long sequences—up to 1 million tokens—whil...",
    "context_length": 1000000,
    "pricing": {
      "prompt": "0.0000004",
      "completion": "0.0000022"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1750200414
  },
  {
    "id": "minimax/minimax-m2",
    "name": "MiniMax: MiniMax M2",
    "description": "MiniMax-M2 is a compact, high-efficiency large language model optimized for end-to-end coding and agentic workflows. With 10 billion activated parameters (230 billion total), it delivers near-frontier intelligence across general reasoning, tool use, and multi-step task execution while maintaining...",
    "context_length": 196608,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1761252093
  },
  {
    "id": "minimax/minimax-m2.1",
    "name": "MiniMax: MiniMax M2.1",
    "description": "MiniMax-M2.1 is a lightweight, state-of-the-art large language model optimized for coding, agentic workflows, and modern application development. With only 10 billion activated parameters, it delivers a major jump in real-world capability while maintaining exceptional latency, scalability, and co...",
    "context_length": 204800,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1766454997
  },
  {
    "id": "minimax/minimax-01",
    "name": "MiniMax: MiniMax-01",
    "description": "MiniMax-01 is a combines MiniMax-Text-01 for text generation and MiniMax-VL-01 for image understanding. It has 456 billion parameters, with 45.9 billion parameters activated per inference, and can handle a context of up to 4 million tokens.\n\nThe text model adopts a hybrid architecture that combin...",
    "context_length": 1000192,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000011"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1736915462
  },
  {
    "id": "mistralai/mistral-large",
    "name": "Mistral Large",
    "description": "This is Mistral AI's flagship model, Mistral Large 2 (version `mistral-large-2407`). It's a proprietary weights-available model and excels at reasoning, code, JSON, chat, and more. Read the launch announcement [here](https://mistral.ai/news/mistral-large-2407/).\n\nIt supports dozens of languages i...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.000002",
      "completion": "0.000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1708905600
  },
  {
    "id": "mistralai/mistral-large-2407",
    "name": "Mistral Large 2407",
    "description": "This is Mistral AI's flagship model, Mistral Large 2 (version mistral-large-2407). It's a proprietary weights-available model and excels at reasoning, code, JSON, chat, and more. Read the launch announcement [here](https://mistral.ai/news/mistral-large-2407/).\n\nIt supports dozens of languages inc...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.000002",
      "completion": "0.000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1731978415
  },
  {
    "id": "mistralai/mistral-large-2411",
    "name": "Mistral Large 2411",
    "description": "Mistral Large 2 2411 is an update of [Mistral Large 2](/mistralai/mistral-large) released together with [Pixtral Large 2411](/mistralai/pixtral-large-2411)\n\nIt provides a significant upgrade on the previous [Mistral Large 24.07](/mistralai/mistral-large-2407), with notable improvements in long co...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.000002",
      "completion": "0.000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1731978685
  },
  {
    "id": "mistralai/mistral-tiny",
    "name": "Mistral Tiny",
    "description": "Note: This model is being deprecated. Recommended replacement is the newer [Ministral 8B](/mistral/ministral-8b)\n\nThis model is currently powered by Mistral-7B-v0.2, and incorporates a \"better\" fine-tuning than [Mistral 7B](/models/mistralai/mistral-7b-instruct-v0.1), inspired by community work. ...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000025",
      "completion": "0.00000025"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1704844800
  },
  {
    "id": "mistralai/codestral-2508",
    "name": "Mistral: Codestral 2508",
    "description": "Mistral's cutting-edge language model for coding released end of July 2025. Codestral specializes in low-latency, high-frequency tasks such as fill-in-the-middle (FIM), code correction and test generation.\n\n[Blog Post](https://mistral.ai/news/codestral-25-08)",
    "context_length": 256000,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000009"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1754079630
  },
  {
    "id": "mistralai/devstral-2512",
    "name": "Mistral: Devstral 2 2512",
    "description": "Devstral 2 is a state-of-the-art open-source model by Mistral AI specializing in agentic coding. It is a 123B-parameter dense transformer model supporting a 256K context window.\n\nDevstral 2 supports exploring codebases and orchestrating changes across multiple files while maintaining architecture...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.00000005",
      "completion": "0.00000022"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1765285419
  },
  {
    "id": "mistralai/devstral-2512:free",
    "name": "Mistral: Devstral 2 2512 (free)",
    "description": "Devstral 2 is a state-of-the-art open-source model by Mistral AI specializing in agentic coding. It is a 123B-parameter dense transformer model supporting a 256K context window.\n\nDevstral 2 supports exploring codebases and orchestrating changes across multiple files while maintaining architecture...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1765285419
  },
  {
    "id": "mistralai/devstral-medium",
    "name": "Mistral: Devstral Medium",
    "description": "Devstral Medium is a high-performance code generation and agentic reasoning model developed jointly by Mistral AI and All Hands AI. Positioned as a step up from Devstral Small, it achieves 61.6% on SWE-Bench Verified, placing it ahead of Gemini 2.5 Pro and GPT-4.1 in code-related tasks, at a frac...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000004",
      "completion": "0.000002"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1752161321
  },
  {
    "id": "mistralai/devstral-small",
    "name": "Mistral: Devstral Small 1.1",
    "description": "Devstral Small 1.1 is a 24B parameter open-weight language model for software engineering agents, developed by Mistral AI in collaboration with All Hands AI. Finetuned from Mistral Small 3.1 and released under the Apache 2.0 license, it features a 128k token context window and supports both Mistr...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00000007",
      "completion": "0.00000028"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1752160751
  },
  {
    "id": "mistralai/devstral-small-2505",
    "name": "Mistral: Devstral Small 2505",
    "description": "Devstral-Small-2505 is a 24B parameter agentic LLM fine-tuned from Mistral-Small-3.1, jointly developed by Mistral AI and All Hands AI for advanced software engineering tasks. It is optimized for codebase exploration, multi-file editing, and integration into coding agents, achieving state-of-the-...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00000006",
      "completion": "0.00000012"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1747837379
  },
  {
    "id": "mistralai/ministral-14b-2512",
    "name": "Mistral: Ministral 3 14B 2512",
    "description": "The largest model in the Ministral 3 family, Ministral 3 14B offers frontier capabilities and performance comparable to its larger Mistral Small 3.2 24B counterpart. A powerful and efficient language model with vision capabilities.",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000002"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1764681735
  },
  {
    "id": "mistralai/ministral-3b-2512",
    "name": "Mistral: Ministral 3 3B 2512",
    "description": "The smallest model in the Ministral 3 family, Ministral 3 3B is a powerful, efficient tiny language model with vision capabilities.",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1764681560
  },
  {
    "id": "mistralai/ministral-8b-2512",
    "name": "Mistral: Ministral 3 8B 2512",
    "description": "A balanced model in the Ministral 3 family, Ministral 3 8B is a powerful, efficient tiny language model with vision capabilities.",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.00000015",
      "completion": "0.00000015"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1764681654
  },
  {
    "id": "mistralai/ministral-3b",
    "name": "Mistral: Ministral 3B",
    "description": "Ministral 3B is a 3B parameter model optimized for on-device and edge computing. It excels in knowledge, commonsense reasoning, and function-calling, outperforming larger models like Mistral 7B on most benchmarks. Supporting up to 128k context length, it’s ideal for orchestrating agentic workflow...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000004",
      "completion": "0.00000004"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1729123200
  },
  {
    "id": "mistralai/ministral-8b",
    "name": "Mistral: Ministral 8B",
    "description": "Ministral 8B is an 8B parameter model featuring a unique interleaved sliding-window attention pattern for faster, memory-efficient inference. Designed for edge use cases, it supports up to 128k context length and excels in knowledge and reasoning tasks. It outperforms peers in the sub-10B categor...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1729123200
  },
  {
    "id": "mistralai/mistral-7b-instruct",
    "name": "Mistral: Mistral 7B Instruct",
    "description": "A high-performing, industry-standard 7.3B parameter model, with optimizations for speed and context length.\n\n*Mistral 7B Instruct has multiple version variants, and this is intended to be the latest version.*",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.000000028",
      "completion": "0.000000054"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral",
      "instruct_type": "mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1716768000
  },
  {
    "id": "mistralai/mistral-7b-instruct:free",
    "name": "Mistral: Mistral 7B Instruct (free)",
    "description": "A high-performing, industry-standard 7.3B parameter model, with optimizations for speed and context length.\n\n*Mistral 7B Instruct has multiple version variants, and this is intended to be the latest version.*",
    "context_length": 32768,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral",
      "instruct_type": "mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1716768000
  },
  {
    "id": "mistralai/mistral-7b-instruct-v0.1",
    "name": "Mistral: Mistral 7B Instruct v0.1",
    "description": "A 7.3B parameter model that outperforms Llama 2 13B on all benchmarks, with optimizations for speed and context length.",
    "context_length": 2824,
    "pricing": {
      "prompt": "0.00000011",
      "completion": "0.00000019"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral",
      "instruct_type": "mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1695859200
  },
  {
    "id": "mistralai/mistral-7b-instruct-v0.2",
    "name": "Mistral: Mistral 7B Instruct v0.2",
    "description": "A high-performing, industry-standard 7.3B parameter model, with optimizations for speed and context length.\n\nAn improved version of [Mistral 7B Instruct](/modelsmistralai/mistral-7b-instruct-v0.1), with the following changes:\n\n- 32k context window (vs 8k context in v0.1)\n- Rope-theta = 1e6\n- No S...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000002"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral",
      "instruct_type": "mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1703721600
  },
  {
    "id": "mistralai/mistral-7b-instruct-v0.3",
    "name": "Mistral: Mistral 7B Instruct v0.3",
    "description": "A high-performing, industry-standard 7.3B parameter model, with optimizations for speed and context length.\n\nAn improved version of [Mistral 7B Instruct v0.2](/models/mistralai/mistral-7b-instruct-v0.2), with the following changes:\n\n- Extended vocabulary to 32768\n- Supports v3 Tokenizer\n- Support...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000002"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral",
      "instruct_type": "mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1716768000
  },
  {
    "id": "mistralai/mistral-large-2512",
    "name": "Mistral: Mistral Large 3 2512",
    "description": "Mistral Large 3 2512 is Mistral’s most capable model to date, featuring a sparse mixture-of-experts architecture with 41B active parameters (675B total), and released under the Apache 2.0 license.",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.0000005",
      "completion": "0.0000015"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1764624472
  },
  {
    "id": "mistralai/mistral-medium-3",
    "name": "Mistral: Mistral Medium 3",
    "description": "Mistral Medium 3 is a high-performance enterprise-grade language model designed to deliver frontier-level capabilities at significantly reduced operational cost. It balances state-of-the-art reasoning and multimodal performance with 8× lower cost compared to traditional large models, making it su...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000004",
      "completion": "0.000002"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1746627341
  },
  {
    "id": "mistralai/mistral-medium-3.1",
    "name": "Mistral: Mistral Medium 3.1",
    "description": "Mistral Medium 3.1 is an updated version of Mistral Medium 3, which is a high-performance enterprise-grade language model designed to deliver frontier-level capabilities at significantly reduced operational cost. It balances state-of-the-art reasoning and multimodal performance with 8× lower cost...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000004",
      "completion": "0.000002"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1755095639
  },
  {
    "id": "mistralai/mistral-nemo",
    "name": "Mistral: Mistral Nemo",
    "description": "A 12B parameter model with a 128k token context length built by Mistral in collaboration with NVIDIA.\n\nThe model is multilingual, supporting English, French, German, Spanish, Italian, Portuguese, Chinese, Japanese, Korean, Arabic, and Hindi.\n\nIt supports function calling and is released under the...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000002",
      "completion": "0.00000004"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral",
      "instruct_type": "mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1721347200
  },
  {
    "id": "mistralai/mistral-small-24b-instruct-2501",
    "name": "Mistral: Mistral Small 3",
    "description": "Mistral Small 3 is a 24B-parameter language model optimized for low-latency performance across common AI tasks. Released under the Apache 2.0 license, it features both pre-trained and instruction-tuned versions designed for efficient local deployment.\n\nThe model achieves 81% accuracy on the MMLU ...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000003",
      "completion": "0.00000011"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738255409
  },
  {
    "id": "mistralai/mistral-small-3.1-24b-instruct",
    "name": "Mistral: Mistral Small 3.1 24B",
    "description": "Mistral Small 3.1 24B Instruct is an upgraded variant of Mistral Small 3 (2501), featuring 24 billion parameters with advanced multimodal capabilities. It provides state-of-the-art performance in text-based reasoning and vision tasks, including image analysis, programming, mathematical reasoning,...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000003",
      "completion": "0.00000011"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1742238937
  },
  {
    "id": "mistralai/mistral-small-3.1-24b-instruct:free",
    "name": "Mistral: Mistral Small 3.1 24B (free)",
    "description": "Mistral Small 3.1 24B Instruct is an upgraded variant of Mistral Small 3 (2501), featuring 24 billion parameters with advanced multimodal capabilities. It provides state-of-the-art performance in text-based reasoning and vision tasks, including image analysis, programming, mathematical reasoning,...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1742238937
  },
  {
    "id": "mistralai/mistral-small-3.2-24b-instruct",
    "name": "Mistral: Mistral Small 3.2 24B",
    "description": "Mistral-Small-3.2-24B-Instruct-2506 is an updated 24B parameter model from Mistral optimized for instruction following, repetition reduction, and improved function calling. Compared to the 3.1 release, version 3.2 significantly improves accuracy on WildBench and Arena Hard, reduces infinite gener...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000006",
      "completion": "0.00000018"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1750443016
  },
  {
    "id": "mistralai/mistral-small-creative",
    "name": "Mistral: Mistral Small Creative",
    "description": "Mistral Small Creative is an experimental small model designed for creative writing, narrative generation, roleplay and character-driven dialogue, general-purpose instruction following, and conversational agents.",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000003"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1765908653
  },
  {
    "id": "mistralai/mixtral-8x22b-instruct",
    "name": "Mistral: Mixtral 8x22B Instruct",
    "description": "Mistral's official instruct fine-tuned version of [Mixtral 8x22B](/models/mistralai/mixtral-8x22b). It uses 39B active parameters out of 141B, offering unparalleled cost efficiency for its size. Its strengths include:\n- strong math, coding, and reasoning\n- large context length (64k)\n- fluency in ...",
    "context_length": 65536,
    "pricing": {
      "prompt": "0.000002",
      "completion": "0.000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral",
      "instruct_type": "mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1713312000
  },
  {
    "id": "mistralai/mixtral-8x7b-instruct",
    "name": "Mistral: Mixtral 8x7B Instruct",
    "description": "Mixtral 8x7B Instruct is a pretrained generative Sparse Mixture of Experts, by Mistral AI, for chat and instruction use. Incorporates 8 experts (feed-forward networks) for a total of 47 billion parameters.\n\nInstruct model fine-tuned by Mistral. #moe",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000054",
      "completion": "0.00000054"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral",
      "instruct_type": "mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1702166400
  },
  {
    "id": "mistralai/pixtral-12b",
    "name": "Mistral: Pixtral 12B",
    "description": "The first multi-modal, text+image-to-text model from Mistral AI. Its weights were launched via torrent: https://x.com/mistralai/status/1833758285167722836.",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1725926400
  },
  {
    "id": "mistralai/pixtral-large-2411",
    "name": "Mistral: Pixtral Large 2411",
    "description": "Pixtral Large is a 124B parameter, open-weight, multimodal model built on top of [Mistral Large 2](/mistralai/mistral-large-2411). The model is able to understand documents, charts and natural images.\n\nThe model is available under the Mistral Research License (MRL) for research and educational us...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.000002",
      "completion": "0.000006"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1731977388
  },
  {
    "id": "mistralai/mistral-saba",
    "name": "Mistral: Saba",
    "description": "Mistral Saba is a 24B-parameter language model specifically designed for the Middle East and South Asia, delivering accurate and contextually relevant responses while maintaining efficient performance. Trained on curated regional datasets, it supports multiple Indian-origin languages—including Ta...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1739803239
  },
  {
    "id": "mistralai/voxtral-small-24b-2507",
    "name": "Mistral: Voxtral Small 24B 2507",
    "description": "Voxtral Small is an enhancement of Mistral Small 3, incorporating state-of-the-art audio input capabilities while retaining best-in-class text performance. It excels at speech transcription, translation and audio understanding. Input audio is priced at $100 per million seconds.",
    "context_length": 32000,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000003"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "audio"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1761835144
  },
  {
    "id": "moonshotai/kimi-dev-72b",
    "name": "MoonshotAI: Kimi Dev 72B",
    "description": "Kimi-Dev-72B is an open-source large language model fine-tuned for software engineering and issue resolution tasks. Based on Qwen2.5-72B, it is optimized using large-scale reinforcement learning that applies code patches in real repositories and validates them via full test suite execution—reward...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000029",
      "completion": "0.00000115"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1750115909
  },
  {
    "id": "moonshotai/kimi-k2",
    "name": "MoonshotAI: Kimi K2 0711",
    "description": "Kimi K2 Instruct is a large-scale Mixture-of-Experts (MoE) language model developed by Moonshot AI, featuring 1 trillion total parameters with 32 billion active per forward pass. It is optimized for agentic capabilities, including advanced tool use, reasoning, and code synthesis. Kimi K2 excels a...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.000000456",
      "completion": "0.00000184"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1752263252
  },
  {
    "id": "moonshotai/kimi-k2:free",
    "name": "MoonshotAI: Kimi K2 0711 (free)",
    "description": "Kimi K2 Instruct is a large-scale Mixture-of-Experts (MoE) language model developed by Moonshot AI, featuring 1 trillion total parameters with 32 billion active per forward pass. It is optimized for agentic capabilities, including advanced tool use, reasoning, and code synthesis. Kimi K2 excels a...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1752263252
  },
  {
    "id": "moonshotai/kimi-k2-0905",
    "name": "MoonshotAI: Kimi K2 0905",
    "description": "Kimi K2 0905 is the September update of [Kimi K2 0711](moonshotai/kimi-k2). It is a large-scale Mixture-of-Experts (MoE) language model developed by Moonshot AI, featuring 1 trillion total parameters with 32 billion active per forward pass. It supports long-context inference up to 256k tokens, ex...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.00000039",
      "completion": "0.0000019"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1757021147
  },
  {
    "id": "moonshotai/kimi-k2-0905:exacto",
    "name": "MoonshotAI: Kimi K2 0905 (exacto)",
    "description": "Kimi K2 0905 is the September update of [Kimi K2 0711](moonshotai/kimi-k2). It is a large-scale Mixture-of-Experts (MoE) language model developed by Moonshot AI, featuring 1 trillion total parameters with 32 billion active per forward pass. It supports long-context inference up to 256k tokens, ex...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.0000006",
      "completion": "0.0000025"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1757021147
  },
  {
    "id": "moonshotai/kimi-k2-thinking",
    "name": "MoonshotAI: Kimi K2 Thinking",
    "description": "Kimi K2 Thinking is Moonshot AI’s most advanced open reasoning model to date, extending the K2 series into agentic, long-horizon reasoning. Built on the trillion-parameter Mixture-of-Experts (MoE) architecture introduced in Kimi K2, it activates 32 billion parameters per forward pass and supports...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.0000004",
      "completion": "0.00000175"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1762440622
  },
  {
    "id": "morph/morph-v3-fast",
    "name": "Morph: Morph V3 Fast",
    "description": "Morph's fastest apply model for code edits. ~10,500 tokens/sec with 96% accuracy for rapid code transformations.\n\nThe model requires the prompt to be in the following format: \n<instruction>{instruction}</instruction>\n<code>{initial_code}</code>\n<update>{edit_snippet}</update>\n\nZero Data Retention...",
    "context_length": 81920,
    "pricing": {
      "prompt": "0.0000008",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1751910002
  },
  {
    "id": "morph/morph-v3-large",
    "name": "Morph: Morph V3 Large",
    "description": "Morph's high-accuracy apply model for complex code edits. ~4,500 tokens/sec with 98% accuracy for precise code transformations.\n\nThe model requires the prompt to be in the following format: \n<instruction>{instruction}</instruction>\n<code>{initial_code}</code>\n<update>{edit_snippet}</update>\n\nZero...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.0000009",
      "completion": "0.0000019"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1751910858
  },
  {
    "id": "gryphe/mythomax-l2-13b",
    "name": "MythoMax 13B",
    "description": "One of the highest performing and most popular fine-tunes of Llama 2 13B, with rich descriptions and roleplay. #merge",
    "context_length": 4096,
    "pricing": {
      "prompt": "0.00000006",
      "completion": "0.00000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama2",
      "instruct_type": "alpaca"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1688256000
  },
  {
    "id": "neversleep/llama-3.1-lumimaid-8b",
    "name": "NeverSleep: Lumimaid v0.2 8B",
    "description": "Lumimaid v0.2 8B is a finetune of [Llama 3.1 8B](/models/meta-llama/llama-3.1-8b-instruct) with a \"HUGE step up dataset wise\" compared to Lumimaid v0.1. Sloppy chats output were purged.\n\nUsage of this model is subject to [Meta's Acceptable Use Policy](https://llama.meta.com/llama3/use-policy/).",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000009",
      "completion": "0.0000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1726358400
  },
  {
    "id": "nex-agi/deepseek-v3.1-nex-n1:free",
    "name": "Nex AGI: DeepSeek V3.1 Nex N1 (free)",
    "description": "DeepSeek V3.1 Nex-N1 is the flagship release of the Nex-N1 series — a post-trained model designed to highlight agent autonomy, tool use, and real-world productivity. \n\nNex-N1 demonstrates competitive performance across all evaluation scenarios, showing particularly strong results in practical cod...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1765204393
  },
  {
    "id": "neversleep/noromaid-20b",
    "name": "Noromaid 20B",
    "description": "A collab between IkariDev and Undi. This merge is suitable for RP, ERP, and general knowledge.\n\n#merge #uncensored",
    "context_length": 4096,
    "pricing": {
      "prompt": "0.000001",
      "completion": "0.00000175"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama2",
      "instruct_type": "alpaca"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1700956800
  },
  {
    "id": "nousresearch/deephermes-3-mistral-24b-preview",
    "name": "Nous: DeepHermes 3 Mistral 24B Preview",
    "description": "DeepHermes 3 (Mistral 24B Preview) is an instruction-tuned language model by Nous Research based on Mistral-Small-24B, designed for chat, function calling, and advanced multi-turn reasoning. It introduces a dual-mode system that toggles between intuitive chat responses and structured “deep reason...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000002",
      "completion": "0.0000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1746830904
  },
  {
    "id": "nousresearch/hermes-3-llama-3.1-405b",
    "name": "Nous: Hermes 3 405B Instruct",
    "description": "Hermes 3 is a generalist language model with many improvements over Hermes 2, including advanced agentic capabilities, much better roleplaying, reasoning, multi-turn conversation, long context coherence, and improvements across the board.\n\nHermes 3 405B is a frontier-level, full-parameter finetun...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.000001",
      "completion": "0.000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "chatml"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1723766400
  },
  {
    "id": "nousresearch/hermes-3-llama-3.1-405b:free",
    "name": "Nous: Hermes 3 405B Instruct (free)",
    "description": "Hermes 3 is a generalist language model with many improvements over Hermes 2, including advanced agentic capabilities, much better roleplaying, reasoning, multi-turn conversation, long context coherence, and improvements across the board.\n\nHermes 3 405B is a frontier-level, full-parameter finetun...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "chatml"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1723766400
  },
  {
    "id": "nousresearch/hermes-3-llama-3.1-70b",
    "name": "Nous: Hermes 3 70B Instruct",
    "description": "Hermes 3 is a generalist language model with many improvements over [Hermes 2](/models/nousresearch/nous-hermes-2-mistral-7b-dpo), including advanced agentic capabilities, much better roleplaying, reasoning, multi-turn conversation, long context coherence, and improvements across the board.\n\nHerm...",
    "context_length": 65536,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000003"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "chatml"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1723939200
  },
  {
    "id": "nousresearch/hermes-4-405b",
    "name": "Nous: Hermes 4 405B",
    "description": "Hermes 4 is a large-scale reasoning model built on Meta-Llama-3.1-405B and released by Nous Research. It introduces a hybrid reasoning mode, where the model can choose to deliberate internally with <think>...</think> traces or respond directly, offering flexibility between speed and depth. Users ...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1756235463
  },
  {
    "id": "nousresearch/hermes-4-70b",
    "name": "Nous: Hermes 4 70B",
    "description": "Hermes 4 70B is a hybrid reasoning model from Nous Research, built on Meta-Llama-3.1-70B. It introduces the same hybrid mode as the larger 405B release, allowing the model to either respond directly or generate explicit <think>...</think> reasoning traces before answering. Users can control the r...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000011",
      "completion": "0.00000038"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1756236182
  },
  {
    "id": "nousresearch/hermes-2-pro-llama-3-8b",
    "name": "NousResearch: Hermes 2 Pro - Llama-3 8B",
    "description": "Hermes 2 Pro is an upgraded, retrained version of Nous Hermes 2, consisting of an updated and cleaned version of the OpenHermes 2.5 Dataset, as well as a newly introduced Function Calling and JSON Mode dataset developed in-house.",
    "context_length": 8192,
    "pricing": {
      "prompt": "0.000000025",
      "completion": "0.00000008"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "chatml"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1716768000
  },
  {
    "id": "nvidia/llama-3.1-nemotron-70b-instruct",
    "name": "NVIDIA: Llama 3.1 Nemotron 70B Instruct",
    "description": "NVIDIA's Llama 3.1 Nemotron 70B is a language model designed for generating precise and useful responses. Leveraging [Llama 3.1 70B](/models/meta-llama/llama-3.1-70b-instruct) architecture and Reinforcement Learning from Human Feedback (RLHF), it excels in automatic alignment benchmarks. This mod...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000012",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1728950400
  },
  {
    "id": "nvidia/llama-3.1-nemotron-ultra-253b-v1",
    "name": "NVIDIA: Llama 3.1 Nemotron Ultra 253B v1",
    "description": "Llama-3.1-Nemotron-Ultra-253B-v1 is a large language model (LLM) optimized for advanced reasoning, human-interactive chat, retrieval-augmented generation (RAG), and tool-calling tasks. Derived from Meta’s Llama-3.1-405B-Instruct, it has been significantly customized using Neural Architecture Sear...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000006",
      "completion": "0.0000018"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1744115059
  },
  {
    "id": "nvidia/llama-3.3-nemotron-super-49b-v1.5",
    "name": "NVIDIA: Llama 3.3 Nemotron Super 49B V1.5",
    "description": "Llama-3.3-Nemotron-Super-49B-v1.5 is a 49B-parameter, English-centric reasoning/chat model derived from Meta’s Llama-3.3-70B-Instruct with a 128K context. It’s post-trained for agentic workflows (RAG, tool calling) via SFT across math, code, science, and multi-turn chat, followed by multiple RL s...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000004"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1760101395
  },
  {
    "id": "nvidia/nemotron-3-nano-30b-a3b",
    "name": "NVIDIA: Nemotron 3 Nano 30B A3B",
    "description": "NVIDIA Nemotron 3 Nano 30B A3B is a small language MoE model with highest compute efficiency and accuracy for developers to build specialized agentic AI systems.\n\nThe model is fully open with open-weights, datasets and recipes so developers can easily\ncustomize, optimize, and deploy the model on ...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.00000006",
      "completion": "0.00000024"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1765731275
  },
  {
    "id": "nvidia/nemotron-3-nano-30b-a3b:free",
    "name": "NVIDIA: Nemotron 3 Nano 30B A3B (free)",
    "description": "NVIDIA Nemotron 3 Nano 30B A3B is a small language MoE model with highest compute efficiency and accuracy for developers to build specialized agentic AI systems.\n\nThe model is fully open with open-weights, datasets and recipes so developers can easily\ncustomize, optimize, and deploy the model on ...",
    "context_length": 256000,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1765731275
  },
  {
    "id": "nvidia/nemotron-nano-12b-v2-vl",
    "name": "NVIDIA: Nemotron Nano 12B 2 VL",
    "description": "NVIDIA Nemotron Nano 2 VL is a 12-billion-parameter open multimodal reasoning model designed for video understanding and document intelligence. It introduces a hybrid Transformer-Mamba architecture, combining transformer-level accuracy with Mamba’s memory-efficient sequence modeling for significa...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000006"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1761675565
  },
  {
    "id": "nvidia/nemotron-nano-12b-v2-vl:free",
    "name": "NVIDIA: Nemotron Nano 12B 2 VL (free)",
    "description": "NVIDIA Nemotron Nano 2 VL is a 12-billion-parameter open multimodal reasoning model designed for video understanding and document intelligence. It introduces a hybrid Transformer-Mamba architecture, combining transformer-level accuracy with Mamba’s memory-efficient sequence modeling for significa...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1761675565
  },
  {
    "id": "nvidia/nemotron-nano-9b-v2",
    "name": "NVIDIA: Nemotron Nano 9B V2",
    "description": "NVIDIA-Nemotron-Nano-9B-v2 is a large language model (LLM) trained from scratch by NVIDIA, and designed as a unified model for both reasoning and non-reasoning tasks. It responds to user queries and tasks by first generating a reasoning trace and then concluding with a final response. \n\nThe model...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000004",
      "completion": "0.00000016"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1757106807
  },
  {
    "id": "nvidia/nemotron-nano-9b-v2:free",
    "name": "NVIDIA: Nemotron Nano 9B V2 (free)",
    "description": "NVIDIA-Nemotron-Nano-9B-v2 is a large language model (LLM) trained from scratch by NVIDIA, and designed as a unified model for both reasoning and non-reasoning tasks. It responds to user queries and tasks by first generating a reasoning trace and then concluding with a final response. \n\nThe model...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1757106807
  },
  {
    "id": "openai/chatgpt-4o-latest",
    "name": "OpenAI: ChatGPT-4o",
    "description": "OpenAI ChatGPT 4o is continually updated by OpenAI to point to the current version of GPT-4o used by ChatGPT. It therefore differs slightly from the API version of [GPT-4o](/models/openai/gpt-4o) in that it has additional RLHF. It is intended for research and evaluation.\n\nOpenAI notes that this m...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.000005",
      "completion": "0.000015"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1723593600
  },
  {
    "id": "openai/codex-mini",
    "name": "OpenAI: Codex Mini",
    "description": "codex-mini-latest is a fine-tuned version of o4-mini specifically for use in Codex CLI. For direct use in the API, we recommend starting with gpt-4.1.",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.0000015",
      "completion": "0.000006"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1747409761
  },
  {
    "id": "openai/gpt-3.5-turbo",
    "name": "OpenAI: GPT-3.5 Turbo",
    "description": "GPT-3.5 Turbo is OpenAI's fastest model. It can understand and generate natural language or code, and is optimized for chat and traditional completion tasks.\n\nTraining data up to Sep 2021.",
    "context_length": 16385,
    "pricing": {
      "prompt": "0.0000005",
      "completion": "0.0000015"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1685232000
  },
  {
    "id": "openai/gpt-3.5-turbo-0613",
    "name": "OpenAI: GPT-3.5 Turbo (older v0613)",
    "description": "GPT-3.5 Turbo is OpenAI's fastest model. It can understand and generate natural language or code, and is optimized for chat and traditional completion tasks.\n\nTraining data up to Sep 2021.",
    "context_length": 4095,
    "pricing": {
      "prompt": "0.000001",
      "completion": "0.000002"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1706140800
  },
  {
    "id": "openai/gpt-3.5-turbo-16k",
    "name": "OpenAI: GPT-3.5 Turbo 16k",
    "description": "This model offers four times the context length of gpt-3.5-turbo, allowing it to support approximately 20 pages of text in a single request at a higher cost. Training data: up to Sep 2021.",
    "context_length": 16385,
    "pricing": {
      "prompt": "0.000003",
      "completion": "0.000004"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1693180800
  },
  {
    "id": "openai/gpt-3.5-turbo-instruct",
    "name": "OpenAI: GPT-3.5 Turbo Instruct",
    "description": "This model is a variant of GPT-3.5 Turbo tuned for instructional prompts and omitting chat-related optimizations. Training data: up to Sep 2021.",
    "context_length": 4095,
    "pricing": {
      "prompt": "0.0000015",
      "completion": "0.000002"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT",
      "instruct_type": "chatml"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1695859200
  },
  {
    "id": "openai/gpt-4",
    "name": "OpenAI: GPT-4",
    "description": "OpenAI's flagship model, GPT-4 is a large-scale multimodal language model capable of solving difficult problems with greater accuracy than previous models due to its broader general knowledge and advanced reasoning capabilities. Training data: up to Sep 2021.",
    "context_length": 8191,
    "pricing": {
      "prompt": "0.00003",
      "completion": "0.00006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1685232000
  },
  {
    "id": "openai/gpt-4-0314",
    "name": "OpenAI: GPT-4 (older v0314)",
    "description": "GPT-4-0314 is the first version of GPT-4 released, with a context length of 8,192 tokens, and was supported until June 14. Training data: up to Sep 2021.",
    "context_length": 8191,
    "pricing": {
      "prompt": "0.00003",
      "completion": "0.00006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1685232000
  },
  {
    "id": "openai/gpt-4-turbo",
    "name": "OpenAI: GPT-4 Turbo",
    "description": "The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling.\n\nTraining data: up to December 2023.",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00001",
      "completion": "0.00003"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1712620800
  },
  {
    "id": "openai/gpt-4-1106-preview",
    "name": "OpenAI: GPT-4 Turbo (older v1106)",
    "description": "The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling.\n\nTraining data: up to April 2023.",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00001",
      "completion": "0.00003"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1699228800
  },
  {
    "id": "openai/gpt-4-turbo-preview",
    "name": "OpenAI: GPT-4 Turbo Preview",
    "description": "The preview GPT-4 model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Training data: up to Dec 2023.\n\n**Note:** heavily rate limited by OpenAI while in preview.",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00001",
      "completion": "0.00003"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1706140800
  },
  {
    "id": "openai/gpt-4.1",
    "name": "OpenAI: GPT-4.1",
    "description": "GPT-4.1 is a flagship large language model optimized for advanced instruction following, real-world software engineering, and long-context reasoning. It supports a 1 million token context window and outperforms GPT-4o and GPT-4.5 across coding (54.6% SWE-bench Verified), instruction compliance (8...",
    "context_length": 1047576,
    "pricing": {
      "prompt": "0.000002",
      "completion": "0.000008"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1744651385
  },
  {
    "id": "openai/gpt-4.1-mini",
    "name": "OpenAI: GPT-4.1 Mini",
    "description": "GPT-4.1 Mini is a mid-sized model delivering performance competitive with GPT-4o at substantially lower latency and cost. It retains a 1 million token context window and scores 45.1% on hard instruction evals, 35.8% on MultiChallenge, and 84.1% on IFEval. Mini also shows strong coding ability (e....",
    "context_length": 1047576,
    "pricing": {
      "prompt": "0.0000004",
      "completion": "0.0000016"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1744651381
  },
  {
    "id": "openai/gpt-4.1-nano",
    "name": "OpenAI: GPT-4.1 Nano",
    "description": "For tasks that demand low latency, GPT‑4.1 nano is the fastest and cheapest model in the GPT-4.1 series. It delivers exceptional performance at a small size with its 1 million token context window, and scores 80.1% on MMLU, 50.3% on GPQA, and 9.8% on Aider polyglot coding – even higher than GPT‑4...",
    "context_length": 1047576,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000004"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1744651369
  },
  {
    "id": "openai/gpt-4o",
    "name": "OpenAI: GPT-4o",
    "description": "GPT-4o (\"o\" for \"omni\") is OpenAI's latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence level of [GPT-4 Turbo](/models/openai/gpt-4-turbo) while being twice as fast and 50% more cost-effective. GPT-4o also offers improved performance in processi...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.0000025",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1715558400
  },
  {
    "id": "openai/gpt-4o-2024-05-13",
    "name": "OpenAI: GPT-4o (2024-05-13)",
    "description": "GPT-4o (\"o\" for \"omni\") is OpenAI's latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence level of [GPT-4 Turbo](/models/openai/gpt-4-turbo) while being twice as fast and 50% more cost-effective. GPT-4o also offers improved performance in processi...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.000005",
      "completion": "0.000015"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1715558400
  },
  {
    "id": "openai/gpt-4o-2024-08-06",
    "name": "OpenAI: GPT-4o (2024-08-06)",
    "description": "The 2024-08-06 version of GPT-4o offers improved performance in structured outputs, with the ability to supply a JSON schema in the respone_format. Read more [here](https://openai.com/index/introducing-structured-outputs-in-the-api/).\n\nGPT-4o (\"o\" for \"omni\") is OpenAI's latest AI model, supporti...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.0000025",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1722902400
  },
  {
    "id": "openai/gpt-4o-2024-11-20",
    "name": "OpenAI: GPT-4o (2024-11-20)",
    "description": "The 2024-11-20 version of GPT-4o offers a leveled-up creative writing ability with more natural, engaging, and tailored writing to improve relevance & readability. It’s also better at working with uploaded files, providing deeper insights & more thorough responses.\n\nGPT-4o (\"o\" for \"omni\") is Ope...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.0000025",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1732127594
  },
  {
    "id": "openai/gpt-4o:extended",
    "name": "OpenAI: GPT-4o (extended)",
    "description": "GPT-4o (\"o\" for \"omni\") is OpenAI's latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence level of [GPT-4 Turbo](/models/openai/gpt-4-turbo) while being twice as fast and 50% more cost-effective. GPT-4o also offers improved performance in processi...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.000006",
      "completion": "0.000018"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1715558400
  },
  {
    "id": "openai/gpt-4o-audio-preview",
    "name": "OpenAI: GPT-4o Audio",
    "description": "The gpt-4o-audio-preview model adds support for audio inputs as prompts. This enhancement allows the model to detect nuances within audio recordings and add depth to generated user experiences. Audio outputs are currently not supported. Audio tokens are priced at $40 per million input audio tokens.",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.0000025",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "audio",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1755233061
  },
  {
    "id": "openai/gpt-4o-search-preview",
    "name": "OpenAI: GPT-4o Search Preview",
    "description": "GPT-4o Search Previewis a specialized model for web search in Chat Completions. It is trained to understand and execute web search queries.",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.0000025",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1741817949
  },
  {
    "id": "openai/gpt-4o-mini",
    "name": "OpenAI: GPT-4o-mini",
    "description": "GPT-4o mini is OpenAI's newest model after [GPT-4 Omni](/models/openai/gpt-4o), supporting both text and image inputs with text outputs.\n\nAs their most advanced small model, it is many multiples more affordable than other recent frontier models, and more than 60% cheaper than [GPT-3.5 Turbo](/mod...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00000015",
      "completion": "0.0000006"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1721260800
  },
  {
    "id": "openai/gpt-4o-mini-2024-07-18",
    "name": "OpenAI: GPT-4o-mini (2024-07-18)",
    "description": "GPT-4o mini is OpenAI's newest model after [GPT-4 Omni](/models/openai/gpt-4o), supporting both text and image inputs with text outputs.\n\nAs their most advanced small model, it is many multiples more affordable than other recent frontier models, and more than 60% cheaper than [GPT-3.5 Turbo](/mod...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00000015",
      "completion": "0.0000006"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1721260800
  },
  {
    "id": "openai/gpt-4o-mini-search-preview",
    "name": "OpenAI: GPT-4o-mini Search Preview",
    "description": "GPT-4o mini Search Preview is a specialized model for web search in Chat Completions. It is trained to understand and execute web search queries.",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00000015",
      "completion": "0.0000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1741818122
  },
  {
    "id": "openai/gpt-5",
    "name": "OpenAI: GPT-5",
    "description": "GPT-5 is OpenAI’s most advanced model, offering major improvements in reasoning, code quality, and user experience. It is optimized for complex tasks that require step-by-step reasoning, instruction following, and accuracy in high-stakes use cases. It supports test-time routing features and advan...",
    "context_length": 400000,
    "pricing": {
      "prompt": "0.00000125",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1754587413
  },
  {
    "id": "openai/gpt-5-chat",
    "name": "OpenAI: GPT-5 Chat",
    "description": "GPT-5 Chat is designed for advanced, natural, multimodal, and context-aware conversations for enterprise applications.",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00000125",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "file",
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1754587837
  },
  {
    "id": "openai/gpt-5-codex",
    "name": "OpenAI: GPT-5 Codex",
    "description": "GPT-5-Codex is a specialized version of GPT-5 optimized for software engineering and coding workflows. It is designed for both interactive development sessions and long, independent execution of complex engineering tasks. The model supports building projects from scratch, feature development, deb...",
    "context_length": 400000,
    "pricing": {
      "prompt": "0.00000125",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1758643403
  },
  {
    "id": "openai/gpt-5-image",
    "name": "OpenAI: GPT-5 Image",
    "description": "[GPT-5](https://openrouter.ai/openai/gpt-5) Image combines OpenAI's GPT-5 model with state-of-the-art image generation capabilities. It offers major improvements in reasoning, code quality, and user experience while incorporating GPT Image 1's superior instruction following, text rendering, and d...",
    "context_length": 400000,
    "pricing": {
      "prompt": "0.00001",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "file"
      ],
      "output_modalities": [
        "image",
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1760447986
  },
  {
    "id": "openai/gpt-5-image-mini",
    "name": "OpenAI: GPT-5 Image Mini",
    "description": "GPT-5 Image Mini combines OpenAI's advanced language capabilities, powered by [GPT-5 Mini](https://openrouter.ai/openai/gpt-5-mini), with GPT Image 1 Mini for efficient image generation. This natively multimodal model features superior instruction following, text rendering, and detailed image edi...",
    "context_length": 400000,
    "pricing": {
      "prompt": "0.0000025",
      "completion": "0.000002"
    },
    "architecture": {
      "input_modalities": [
        "file",
        "image",
        "text"
      ],
      "output_modalities": [
        "image",
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1760624583
  },
  {
    "id": "openai/gpt-5-mini",
    "name": "OpenAI: GPT-5 Mini",
    "description": "GPT-5 Mini is a compact version of GPT-5, designed to handle lighter-weight reasoning tasks. It provides the same instruction-following and safety-tuning benefits as GPT-5, but with reduced latency and cost. GPT-5 Mini is the successor to OpenAI's o4-mini model.",
    "context_length": 400000,
    "pricing": {
      "prompt": "0.00000025",
      "completion": "0.000002"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1754587407
  },
  {
    "id": "openai/gpt-5-nano",
    "name": "OpenAI: GPT-5 Nano",
    "description": "GPT-5-Nano is the smallest and fastest variant in the GPT-5 system, optimized for developer tools, rapid interactions, and ultra-low latency environments. While limited in reasoning depth compared to its larger counterparts, it retains key instruction-following and safety features. It is the succ...",
    "context_length": 400000,
    "pricing": {
      "prompt": "0.00000005",
      "completion": "0.0000004"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1754587402
  },
  {
    "id": "openai/gpt-5-pro",
    "name": "OpenAI: GPT-5 Pro",
    "description": "GPT-5 Pro is OpenAI’s most advanced model, offering major improvements in reasoning, code quality, and user experience. It is optimized for complex tasks that require step-by-step reasoning, instruction following, and accuracy in high-stakes use cases. It supports test-time routing features and a...",
    "context_length": 400000,
    "pricing": {
      "prompt": "0.000015",
      "completion": "0.00012"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1759776663
  },
  {
    "id": "openai/gpt-5.1",
    "name": "OpenAI: GPT-5.1",
    "description": "GPT-5.1 is the latest frontier-grade model in the GPT-5 series, offering stronger general-purpose reasoning, improved instruction adherence, and a more natural conversational style compared to GPT-5. It uses adaptive reasoning to allocate computation dynamically, responding quickly to simple quer...",
    "context_length": 400000,
    "pricing": {
      "prompt": "0.00000125",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1763060305
  },
  {
    "id": "openai/gpt-5.1-chat",
    "name": "OpenAI: GPT-5.1 Chat",
    "description": "GPT-5.1 Chat (AKA Instant is the fast, lightweight member of the 5.1 family, optimized for low-latency chat while retaining strong general intelligence. It uses adaptive reasoning to selectively “think” on harder queries, improving accuracy on math, coding, and multi-step tasks without slowing do...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00000125",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "file",
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1763060302
  },
  {
    "id": "openai/gpt-5.1-codex",
    "name": "OpenAI: GPT-5.1-Codex",
    "description": "GPT-5.1-Codex is a specialized version of GPT-5.1 optimized for software engineering and coding workflows. It is designed for both interactive development sessions and long, independent execution of complex engineering tasks. The model supports building projects from scratch, feature development,...",
    "context_length": 400000,
    "pricing": {
      "prompt": "0.00000125",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1763060298
  },
  {
    "id": "openai/gpt-5.1-codex-max",
    "name": "OpenAI: GPT-5.1-Codex-Max",
    "description": "GPT-5.1-Codex-Max is OpenAI’s latest agentic coding model, designed for long-running, high-context software development tasks. It is based on an updated version of the 5.1 reasoning stack and trained on agentic workflows spanning software engineering, mathematics, and research. \nGPT-5.1-Codex-Max...",
    "context_length": 400000,
    "pricing": {
      "prompt": "0.00000125",
      "completion": "0.00001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1764878934
  },
  {
    "id": "openai/gpt-5.1-codex-mini",
    "name": "OpenAI: GPT-5.1-Codex-Mini",
    "description": "GPT-5.1-Codex-Mini is a smaller and faster version of GPT-5.1-Codex",
    "context_length": 400000,
    "pricing": {
      "prompt": "0.00000025",
      "completion": "0.000002"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1763057820
  },
  {
    "id": "openai/gpt-5.2",
    "name": "OpenAI: GPT-5.2",
    "description": "GPT-5.2 is the latest frontier-grade model in the GPT-5 series, offering stronger agentic and long context perfomance compared to GPT-5.1. It uses adaptive reasoning to allocate computation dynamically, responding quickly to simple queries while spending more depth on complex tasks.\n\nBuilt for br...",
    "context_length": 400000,
    "pricing": {
      "prompt": "0.00000175",
      "completion": "0.000014"
    },
    "architecture": {
      "input_modalities": [
        "file",
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1765389775
  },
  {
    "id": "openai/gpt-5.2-chat",
    "name": "OpenAI: GPT-5.2 Chat",
    "description": "GPT-5.2 Chat (AKA Instant) is the fast, lightweight member of the 5.2 family, optimized for low-latency chat while retaining strong general intelligence. It uses adaptive reasoning to selectively “think” on harder queries, improving accuracy on math, coding, and multi-step tasks without slowing d...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.00000175",
      "completion": "0.000014"
    },
    "architecture": {
      "input_modalities": [
        "file",
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1765389783
  },
  {
    "id": "openai/gpt-5.2-pro",
    "name": "OpenAI: GPT-5.2 Pro",
    "description": "GPT-5.2 Pro is OpenAI’s most advanced model, offering major improvements in agentic coding and long context performance over GPT-5 Pro. It is optimized for complex tasks that require step-by-step reasoning, instruction following, and accuracy in high-stakes use cases. It supports test-time routin...",
    "context_length": 400000,
    "pricing": {
      "prompt": "0.000021",
      "completion": "0.000168"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1765389780
  },
  {
    "id": "openai/gpt-oss-120b",
    "name": "OpenAI: gpt-oss-120b",
    "description": "gpt-oss-120b is an open-weight, 117B-parameter Mixture-of-Experts (MoE) language model from OpenAI designed for high-reasoning, agentic, and general-purpose production use cases. It activates 5.1B parameters per forward pass and is optimized to run on a single H100 GPU with native MXFP4 quantizat...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000002",
      "completion": "0.0000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1754414231
  },
  {
    "id": "openai/gpt-oss-120b:exacto",
    "name": "OpenAI: gpt-oss-120b (exacto)",
    "description": "gpt-oss-120b is an open-weight, 117B-parameter Mixture-of-Experts (MoE) language model from OpenAI designed for high-reasoning, agentic, and general-purpose production use cases. It activates 5.1B parameters per forward pass and is optimized to run on a single H100 GPU with native MXFP4 quantizat...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.000000039",
      "completion": "0.00000019"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1754414231
  },
  {
    "id": "openai/gpt-oss-120b:free",
    "name": "OpenAI: gpt-oss-120b (free)",
    "description": "gpt-oss-120b is an open-weight, 117B-parameter Mixture-of-Experts (MoE) language model from OpenAI designed for high-reasoning, agentic, and general-purpose production use cases. It activates 5.1B parameters per forward pass and is optimized to run on a single H100 GPU with native MXFP4 quantizat...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1754414231
  },
  {
    "id": "openai/gpt-oss-20b",
    "name": "OpenAI: gpt-oss-20b",
    "description": "gpt-oss-20b is an open-weight 21B parameter model released by OpenAI under the Apache 2.0 license. It uses a Mixture-of-Experts (MoE) architecture with 3.6B active parameters per forward pass, optimized for lower-latency inference and deployability on consumer or single-GPU hardware. The model is...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.000000016",
      "completion": "0.00000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1754414229
  },
  {
    "id": "openai/gpt-oss-20b:free",
    "name": "OpenAI: gpt-oss-20b (free)",
    "description": "gpt-oss-20b is an open-weight 21B parameter model released by OpenAI under the Apache 2.0 license. It uses a Mixture-of-Experts (MoE) architecture with 3.6B active parameters per forward pass, optimized for lower-latency inference and deployability on consumer or single-GPU hardware. The model is...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1754414229
  },
  {
    "id": "openai/gpt-oss-safeguard-20b",
    "name": "OpenAI: gpt-oss-safeguard-20b",
    "description": "gpt-oss-safeguard-20b is a safety reasoning model from OpenAI built upon gpt-oss-20b. This open-weight, 21B-parameter Mixture-of-Experts (MoE) model offers lower latency for safety tasks like content classification, LLM filtering, and trust & safety labeling.\n\nLearn more about this model in OpenA...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.000000075",
      "completion": "0.0000003"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1761752836
  },
  {
    "id": "openai/o1",
    "name": "OpenAI: o1",
    "description": "The latest and strongest model family from OpenAI, o1 is designed to spend more time thinking before responding. The o1 model series is trained with large-scale reinforcement learning to reason using chain of thought. \n\nThe o1 models are optimized for math, science, programming, and other STEM-re...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.000015",
      "completion": "0.00006"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1734459999
  },
  {
    "id": "openai/o1-pro",
    "name": "OpenAI: o1-pro",
    "description": "The o1 series of models are trained with reinforcement learning to think before they answer and perform complex reasoning. The o1-pro model uses more compute to think harder and provide consistently better answers.",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.00015",
      "completion": "0.0006"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1742423211
  },
  {
    "id": "openai/o3",
    "name": "OpenAI: o3",
    "description": "o3 is a well-rounded and powerful model across domains. It sets a new standard for math, science, coding, and visual reasoning tasks. It also excels at technical writing and instruction-following. Use it to think through multi-step problems that involve analysis across text, code, and images. ",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.000002",
      "completion": "0.000008"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1744823457
  },
  {
    "id": "openai/o3-deep-research",
    "name": "OpenAI: o3 Deep Research",
    "description": "o3-deep-research is OpenAI's advanced model for deep research, designed to tackle complex, multi-step research tasks.\n\nNote: This model always uses the 'web_search' tool which adds additional cost.",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.00001",
      "completion": "0.00004"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1760129661
  },
  {
    "id": "openai/o3-mini",
    "name": "OpenAI: o3 Mini",
    "description": "OpenAI o3-mini is a cost-efficient language model optimized for STEM reasoning tasks, particularly excelling in science, mathematics, and coding.\n\nThis model supports the `reasoning_effort` parameter, which can be set to \"high\", \"medium\", or \"low\" to control the thinking time of the model. The de...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.0000011",
      "completion": "0.0000044"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1738351721
  },
  {
    "id": "openai/o3-mini-high",
    "name": "OpenAI: o3 Mini High",
    "description": "OpenAI o3-mini-high is the same model as [o3-mini](/openai/o3-mini) with reasoning_effort set to high. \n\no3-mini is a cost-efficient language model optimized for STEM reasoning tasks, particularly excelling in science, mathematics, and coding. The model features three adjustable reasoning effort ...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.0000011",
      "completion": "0.0000044"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1739372611
  },
  {
    "id": "openai/o3-pro",
    "name": "OpenAI: o3 Pro",
    "description": "The o-series of models are trained with reinforcement learning to think before they answer and perform complex reasoning. The o3-pro model uses more compute to think harder and provide consistently better answers.\n\nNote that BYOK is required for this model. Set up here: https://openrouter.ai/sett...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.00002",
      "completion": "0.00008"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "file",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1749598352
  },
  {
    "id": "openai/o4-mini",
    "name": "OpenAI: o4 Mini",
    "description": "OpenAI o4-mini is a compact reasoning model in the o-series, optimized for fast, cost-efficient performance while retaining strong multimodal and agentic capabilities. It supports tool use and demonstrates competitive reasoning and coding performance across benchmarks like AIME (99.5% with Python...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.0000011",
      "completion": "0.0000044"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1744820942
  },
  {
    "id": "openai/o4-mini-deep-research",
    "name": "OpenAI: o4 Mini Deep Research",
    "description": "o4-mini-deep-research is OpenAI's faster, more affordable deep research model—ideal for tackling complex, multi-step research tasks.\n\nNote: This model always uses the 'web_search' tool which adds additional cost.",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.000002",
      "completion": "0.000008"
    },
    "architecture": {
      "input_modalities": [
        "file",
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "GPT"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1760129642
  },
  {
    "id": "openai/o4-mini-high",
    "name": "OpenAI: o4 Mini High",
    "description": "OpenAI o4-mini-high is the same model as [o4-mini](/openai/o4-mini) with reasoning_effort set to high. \n\nOpenAI o4-mini is a compact reasoning model in the o-series, optimized for fast, cost-efficient performance while retaining strong multimodal and agentic capabilities. It supports tool use and...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.0000011",
      "completion": "0.0000044"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "file"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": true
    },
    "created": 1744824212
  },
  {
    "id": "opengvlab/internvl3-78b",
    "name": "OpenGVLab: InternVL3 78B",
    "description": "The InternVL3 series is an advanced multimodal large language model (MLLM). Compared to InternVL 2.5, InternVL3 demonstrates stronger multimodal perception and reasoning capabilities. \n\nIn addition, InternVL3 is benchmarked against the Qwen2.5 Chat models, whose pre-trained base models serve as t...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.00000039"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1757962555
  },
  {
    "id": "perplexity/sonar",
    "name": "Perplexity: Sonar",
    "description": "Sonar is lightweight, affordable, fast, and simple to use — now featuring citations and the ability to customize sources. It is designed for companies seeking to integrate lightweight question-and-answer features optimized for speed.",
    "context_length": 127072,
    "pricing": {
      "prompt": "0.000001",
      "completion": "0.000001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738013808
  },
  {
    "id": "perplexity/sonar-deep-research",
    "name": "Perplexity: Sonar Deep Research",
    "description": "Sonar Deep Research is a research-focused model designed for multi-step retrieval, synthesis, and reasoning across complex topics. It autonomously searches, reads, and evaluates sources, refining its approach as it gathers information. This enables comprehensive report generation across domains l...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.000002",
      "completion": "0.000008"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other",
      "instruct_type": "deepseek-r1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1741311246
  },
  {
    "id": "perplexity/sonar-pro",
    "name": "Perplexity: Sonar Pro",
    "description": "Note: Sonar Pro pricing includes Perplexity search pricing. See [details here](https://docs.perplexity.ai/guides/pricing#detailed-pricing-breakdown-for-sonar-reasoning-pro-and-sonar-pro)\n\nFor enterprises seeking more advanced capabilities, the Sonar Pro API can handle in-depth, multi-step queries...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.000003",
      "completion": "0.000015"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1741312423
  },
  {
    "id": "perplexity/sonar-pro-search",
    "name": "Perplexity: Sonar Pro Search",
    "description": "Exclusively available on the OpenRouter API, Sonar Pro's new Pro Search mode is Perplexity's most advanced agentic search system. It is designed for deeper reasoning and analysis. Pricing is based on tokens plus $18 per thousand requests. This model powers the Pro Search mode on the Perplexity pl...",
    "context_length": 200000,
    "pricing": {
      "prompt": "0.000003",
      "completion": "0.000015"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1761854366
  },
  {
    "id": "perplexity/sonar-reasoning",
    "name": "Perplexity: Sonar Reasoning",
    "description": "Sonar Reasoning is a reasoning model provided by Perplexity based on [DeepSeek R1](/deepseek/deepseek-r1).\n\nIt allows developers to utilize long chain of thought with built-in web search. Sonar Reasoning is uncensored and hosted in US datacenters. ",
    "context_length": 127000,
    "pricing": {
      "prompt": "0.000001",
      "completion": "0.000005"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other",
      "instruct_type": "deepseek-r1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738131107
  },
  {
    "id": "perplexity/sonar-reasoning-pro",
    "name": "Perplexity: Sonar Reasoning Pro",
    "description": "Note: Sonar Pro pricing includes Perplexity search pricing. See [details here](https://docs.perplexity.ai/guides/pricing#detailed-pricing-breakdown-for-sonar-reasoning-pro-and-sonar-pro)\n\nSonar Reasoning Pro is a premier reasoning model powered by DeepSeek R1 with Chain of Thought (CoT). Designed...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.000002",
      "completion": "0.000008"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other",
      "instruct_type": "deepseek-r1"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1741313308
  },
  {
    "id": "prime-intellect/intellect-3",
    "name": "Prime Intellect: INTELLECT-3",
    "description": "INTELLECT-3 is a 106B-parameter Mixture-of-Experts model (12B active) post-trained from GLM-4.5-Air-Base using supervised fine-tuning (SFT) followed by large-scale reinforcement learning (RL). It offers state-of-the-art performance for its size across math, code, science, and general reasoning, c...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000011"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1764212534
  },
  {
    "id": "qwen/qwen-plus-2025-07-28",
    "name": "Qwen: Qwen Plus 0728",
    "description": "Qwen Plus 0728, based on the Qwen3 foundation model, is a 1 million context hybrid reasoning model with a balanced performance, speed, and cost combination.",
    "context_length": 1000000,
    "pricing": {
      "prompt": "0.0000004",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1757347599
  },
  {
    "id": "qwen/qwen-plus-2025-07-28:thinking",
    "name": "Qwen: Qwen Plus 0728 (thinking)",
    "description": "Qwen Plus 0728, based on the Qwen3 foundation model, is a 1 million context hybrid reasoning model with a balanced performance, speed, and cost combination.",
    "context_length": 1000000,
    "pricing": {
      "prompt": "0.0000004",
      "completion": "0.000004"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1757347599
  },
  {
    "id": "qwen/qwen-vl-max",
    "name": "Qwen: Qwen VL Max",
    "description": "Qwen VL Max is a visual understanding model with 7500 tokens context length. It excels in delivering optimal performance for a broader spectrum of complex tasks.\n",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000008",
      "completion": "0.0000032"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738434304
  },
  {
    "id": "qwen/qwen-vl-plus",
    "name": "Qwen: Qwen VL Plus",
    "description": "Qwen's Enhanced Large Visual Language Model. Significantly upgraded for detailed recognition capabilities and text recognition abilities, supporting ultra-high pixel resolutions up to millions of pixels and extreme aspect ratios for image input. It delivers significant performance across a broad ...",
    "context_length": 7500,
    "pricing": {
      "prompt": "0.00000021",
      "completion": "0.00000063"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738731255
  },
  {
    "id": "qwen/qwen-max",
    "name": "Qwen: Qwen-Max ",
    "description": "Qwen-Max, based on Qwen2.5, provides the best inference performance among [Qwen models](/qwen), especially for complex multi-step tasks. It's a large-scale MoE model that has been pretrained on over 20 trillion tokens and further post-trained with curated Supervised Fine-Tuning (SFT) and Reinforc...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.0000016",
      "completion": "0.0000064"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738402289
  },
  {
    "id": "qwen/qwen-plus",
    "name": "Qwen: Qwen-Plus",
    "description": "Qwen-Plus, based on the Qwen2.5 foundation model, is a 131K context model with a balanced performance, speed, and cost combination.",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000004",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738409840
  },
  {
    "id": "qwen/qwen-turbo",
    "name": "Qwen: Qwen-Turbo",
    "description": "Qwen-Turbo, based on Qwen2.5, is a 1M context model that provides fast speed and low cost, suitable for simple tasks.",
    "context_length": 1000000,
    "pricing": {
      "prompt": "0.00000005",
      "completion": "0.0000002"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738410974
  },
  {
    "id": "qwen/qwen-2.5-7b-instruct",
    "name": "Qwen: Qwen2.5 7B Instruct",
    "description": "Qwen2.5 7B is the latest series of Qwen large language models. Qwen2.5 brings the following improvements upon Qwen2:\n\n- Significantly more knowledge and has greatly improved capabilities in coding and mathematics, thanks to our specialized expert models in these domains.\n\n- Significant improvemen...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000004",
      "completion": "0.0000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen",
      "instruct_type": "chatml"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1729036800
  },
  {
    "id": "qwen/qwen2.5-coder-7b-instruct",
    "name": "Qwen: Qwen2.5 Coder 7B Instruct",
    "description": "Qwen2.5-Coder-7B-Instruct is a 7B parameter instruction-tuned language model optimized for code-related tasks such as code generation, reasoning, and bug fixing. Based on the Qwen2.5 architecture, it incorporates enhancements like RoPE, SwiGLU, RMSNorm, and GQA attention with support for up to 12...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000003",
      "completion": "0.00000009"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1744734887
  },
  {
    "id": "qwen/qwen2.5-vl-32b-instruct",
    "name": "Qwen: Qwen2.5 VL 32B Instruct",
    "description": "Qwen2.5-VL-32B is a multimodal vision-language model fine-tuned through reinforcement learning for enhanced mathematical reasoning, structured outputs, and visual problem-solving capabilities. It excels at visual analysis tasks, including object recognition, textual interpretation within images, ...",
    "context_length": 16384,
    "pricing": {
      "prompt": "0.00000005",
      "completion": "0.00000022"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1742839838
  },
  {
    "id": "qwen/qwen2.5-vl-72b-instruct",
    "name": "Qwen: Qwen2.5 VL 72B Instruct",
    "description": "Qwen2.5-VL is proficient in recognizing common objects such as flowers, birds, fish, and insects. It is also highly capable of analyzing texts, charts, icons, graphics, and layouts within images.",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000007",
      "completion": "0.00000026"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1738410311
  },
  {
    "id": "qwen/qwen-2.5-vl-7b-instruct",
    "name": "Qwen: Qwen2.5-VL 7B Instruct",
    "description": "Qwen2.5 VL 7B is a multimodal LLM from the Qwen Team with the following key enhancements:\n\n- SoTA understanding of images of various resolution & ratio: Qwen2.5-VL achieves state-of-the-art performance on visual understanding benchmarks, including MathVista, DocVQA, RealWorldQA, MTVQA, etc.\n\n- Un...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000002"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1724803200
  },
  {
    "id": "qwen/qwen-2.5-vl-7b-instruct:free",
    "name": "Qwen: Qwen2.5-VL 7B Instruct (free)",
    "description": "Qwen2.5 VL 7B is a multimodal LLM from the Qwen Team with the following key enhancements:\n\n- SoTA understanding of images of various resolution & ratio: Qwen2.5-VL achieves state-of-the-art performance on visual understanding benchmarks, including MathVista, DocVQA, RealWorldQA, MTVQA, etc.\n\n- Un...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1724803200
  },
  {
    "id": "qwen/qwen3-14b",
    "name": "Qwen: Qwen3 14B",
    "description": "Qwen3-14B is a dense 14.8B parameter causal language model from the Qwen3 series, designed for both complex reasoning and efficient dialogue. It supports seamless switching between a \"thinking\" mode for tasks like math, programming, and logical inference, and a \"non-thinking\" mode for general-pur...",
    "context_length": 40960,
    "pricing": {
      "prompt": "0.00000005",
      "completion": "0.00000022"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3",
      "instruct_type": "qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1745876478
  },
  {
    "id": "qwen/qwen3-235b-a22b",
    "name": "Qwen: Qwen3 235B A22B",
    "description": "Qwen3-235B-A22B is a 235B parameter mixture-of-experts (MoE) model developed by Qwen, activating 22B parameters per forward pass. It supports seamless switching between a \"thinking\" mode for complex reasoning, math, and code tasks, and a \"non-thinking\" mode for general conversational efficiency. ...",
    "context_length": 40960,
    "pricing": {
      "prompt": "0.00000018",
      "completion": "0.00000054"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3",
      "instruct_type": "qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1745875757
  },
  {
    "id": "qwen/qwen3-235b-a22b-2507",
    "name": "Qwen: Qwen3 235B A22B Instruct 2507",
    "description": "Qwen3-235B-A22B-Instruct-2507 is a multilingual, instruction-tuned mixture-of-experts language model based on the Qwen3-235B architecture, with 22B active parameters per forward pass. It is optimized for general-purpose text generation, including instruction following, logical reasoning, math, co...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.000000071",
      "completion": "0.000000463"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1753119555
  },
  {
    "id": "qwen/qwen3-235b-a22b-thinking-2507",
    "name": "Qwen: Qwen3 235B A22B Thinking 2507",
    "description": "Qwen3-235B-A22B-Thinking-2507 is a high-performance, open-weight Mixture-of-Experts (MoE) language model optimized for complex reasoning tasks. It activates 22B of its 235B parameters per forward pass and natively supports up to 262,144 tokens of context. This \"thinking-only\" variant enhances str...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.00000011",
      "completion": "0.0000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3",
      "instruct_type": "qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1753449557
  },
  {
    "id": "qwen/qwen3-30b-a3b",
    "name": "Qwen: Qwen3 30B A3B",
    "description": "Qwen3, the latest generation in the Qwen large language model series, features both dense and mixture-of-experts (MoE) architectures to excel in reasoning, multilingual support, and advanced agent tasks. Its unique ability to switch seamlessly between a thinking mode for complex reasoning and a n...",
    "context_length": 40960,
    "pricing": {
      "prompt": "0.00000006",
      "completion": "0.00000022"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3",
      "instruct_type": "qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1745878604
  },
  {
    "id": "qwen/qwen3-30b-a3b-instruct-2507",
    "name": "Qwen: Qwen3 30B A3B Instruct 2507",
    "description": "Qwen3-30B-A3B-Instruct-2507 is a 30.5B-parameter mixture-of-experts language model from Qwen, with 3.3B active parameters per inference. It operates in non-thinking mode and is designed for high-quality instruction following, multilingual understanding, and agentic tool use. Post-trained on instr...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.00000008",
      "completion": "0.00000033"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1753806965
  },
  {
    "id": "qwen/qwen3-30b-a3b-thinking-2507",
    "name": "Qwen: Qwen3 30B A3B Thinking 2507",
    "description": "Qwen3-30B-A3B-Thinking-2507 is a 30B parameter Mixture-of-Experts reasoning model optimized for complex tasks requiring extended multi-step thinking. The model is designed specifically for “thinking mode,” where internal reasoning traces are separated from final answers.\n\nCompared to earlier Qwen...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.000000051",
      "completion": "0.00000034"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1756399192
  },
  {
    "id": "qwen/qwen3-32b",
    "name": "Qwen: Qwen3 32B",
    "description": "Qwen3-32B is a dense 32.8B parameter causal language model from the Qwen3 series, optimized for both complex reasoning and efficient dialogue. It supports seamless switching between a \"thinking\" mode for tasks like math, coding, and logical inference, and a \"non-thinking\" mode for faster, general...",
    "context_length": 40960,
    "pricing": {
      "prompt": "0.00000008",
      "completion": "0.00000024"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3",
      "instruct_type": "qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1745875945
  },
  {
    "id": "qwen/qwen3-4b:free",
    "name": "Qwen: Qwen3 4B (free)",
    "description": "Qwen3-4B is a 4 billion parameter dense language model from the Qwen3 series, designed to support both general-purpose and reasoning-intensive tasks. It introduces a dual-mode architecture—thinking and non-thinking—allowing dynamic switching between high-precision logical reasoning and efficient ...",
    "context_length": 40960,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3",
      "instruct_type": "qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1746031104
  },
  {
    "id": "qwen/qwen3-8b",
    "name": "Qwen: Qwen3 8B",
    "description": "Qwen3-8B is a dense 8.2B parameter causal language model from the Qwen3 series, designed for both reasoning-heavy tasks and efficient dialogue. It supports seamless switching between \"thinking\" mode for math, coding, and logical inference, and \"non-thinking\" mode for general conversation. The mod...",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.000000035",
      "completion": "0.000000138"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3",
      "instruct_type": "qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1745876632
  },
  {
    "id": "qwen/qwen3-coder-30b-a3b-instruct",
    "name": "Qwen: Qwen3 Coder 30B A3B Instruct",
    "description": "Qwen3-Coder-30B-A3B-Instruct is a 30.5B parameter Mixture-of-Experts (MoE) model with 128 experts (8 active per forward pass), designed for advanced code generation, repository-scale understanding, and agentic tool use. Built on the Qwen3 architecture, it supports a native context length of 256K ...",
    "context_length": 160000,
    "pricing": {
      "prompt": "0.00000007",
      "completion": "0.00000027"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1753972379
  },
  {
    "id": "qwen/qwen3-coder",
    "name": "Qwen: Qwen3 Coder 480B A35B",
    "description": "Qwen3-Coder-480B-A35B-Instruct is a Mixture-of-Experts (MoE) code generation model developed by the Qwen team. It is optimized for agentic coding tasks such as function calling, tool use, and long-context reasoning over repositories. The model features 480 billion total parameters, with 35 billio...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.00000022",
      "completion": "0.00000095"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1753230546
  },
  {
    "id": "qwen/qwen3-coder:exacto",
    "name": "Qwen: Qwen3 Coder 480B A35B (exacto)",
    "description": "Qwen3-Coder-480B-A35B-Instruct is a Mixture-of-Experts (MoE) code generation model developed by the Qwen team. It is optimized for agentic coding tasks such as function calling, tool use, and long-context reasoning over repositories. The model features 480 billion total parameters, with 35 billio...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.00000022",
      "completion": "0.0000018"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1753230546
  },
  {
    "id": "qwen/qwen3-coder:free",
    "name": "Qwen: Qwen3 Coder 480B A35B (free)",
    "description": "Qwen3-Coder-480B-A35B-Instruct is a Mixture-of-Experts (MoE) code generation model developed by the Qwen team. It is optimized for agentic coding tasks such as function calling, tool use, and long-context reasoning over repositories. The model features 480 billion total parameters, with 35 billio...",
    "context_length": 262000,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1753230546
  },
  {
    "id": "qwen/qwen3-coder-flash",
    "name": "Qwen: Qwen3 Coder Flash",
    "description": "Qwen3 Coder Flash is Alibaba's fast and cost efficient version of their proprietary Qwen3 Coder Plus. It is a powerful coding agent model specializing in autonomous programming via tool calling and environment interaction, combining coding proficiency with versatile general-purpose abilities.",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000015"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1758115536
  },
  {
    "id": "qwen/qwen3-coder-plus",
    "name": "Qwen: Qwen3 Coder Plus",
    "description": "Qwen3 Coder Plus is Alibaba's proprietary version of the Open Source Qwen3 Coder 480B A35B. It is a powerful coding agent model specializing in autonomous programming via tool calling and environment interaction, combining coding proficiency with versatile general-purpose abilities.",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.000001",
      "completion": "0.000005"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1758662707
  },
  {
    "id": "qwen/qwen3-max",
    "name": "Qwen: Qwen3 Max",
    "description": "Qwen3-Max is an updated release built on the Qwen3 series, offering major improvements in reasoning, instruction following, multilingual support, and long-tail knowledge coverage compared to the January 2025 version. It delivers higher accuracy in math, coding, logic, and science tasks, follows c...",
    "context_length": 256000,
    "pricing": {
      "prompt": "0.0000012",
      "completion": "0.000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1758662808
  },
  {
    "id": "qwen/qwen3-next-80b-a3b-instruct",
    "name": "Qwen: Qwen3 Next 80B A3B Instruct",
    "description": "Qwen3-Next-80B-A3B-Instruct is an instruction-tuned chat model in the Qwen3-Next series optimized for fast, stable responses without “thinking” traces. It targets complex tasks across reasoning, code generation, knowledge QA, and multilingual use, while remaining robust on alignment and formattin...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.00000006",
      "completion": "0.0000006"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1757612213
  },
  {
    "id": "qwen/qwen3-next-80b-a3b-thinking",
    "name": "Qwen: Qwen3 Next 80B A3B Thinking",
    "description": "Qwen3-Next-80B-A3B-Thinking is a reasoning-first chat model in the Qwen3-Next line that outputs structured “thinking” traces by default. It’s designed for hard multi-step problems; math proofs, code synthesis/debugging, logic, and agentic planning, and reports strong results across knowledge, rea...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.00000015",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1757612284
  },
  {
    "id": "qwen/qwen3-vl-235b-a22b-instruct",
    "name": "Qwen: Qwen3 VL 235B A22B Instruct",
    "description": "Qwen3-VL-235B-A22B Instruct is an open-weight multimodal model that unifies strong text generation with visual understanding across images and video. The Instruct model targets general vision-language use (VQA, document parsing, chart/table extraction, multilingual OCR). The series emphasizes rob...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1758668687
  },
  {
    "id": "qwen/qwen3-vl-235b-a22b-thinking",
    "name": "Qwen: Qwen3 VL 235B A22B Thinking",
    "description": "Qwen3-VL-235B-A22B Thinking is a multimodal model that unifies strong text generation with visual understanding across images and video. The Thinking model is optimized for multimodal reasoning in STEM and math. The series emphasizes robust perception (recognition of diverse real-world and synthe...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1758668690
  },
  {
    "id": "qwen/qwen3-vl-30b-a3b-instruct",
    "name": "Qwen: Qwen3 VL 30B A3B Instruct",
    "description": "Qwen3-VL-30B-A3B-Instruct is a multimodal model that unifies strong text generation with visual understanding for images and videos. Its Instruct variant optimizes instruction-following for general multimodal tasks. It excels in perception of real-world/synthetic categories, 2D/3D spatial groundi...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.00000015",
      "completion": "0.0000006"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1759794476
  },
  {
    "id": "qwen/qwen3-vl-30b-a3b-thinking",
    "name": "Qwen: Qwen3 VL 30B A3B Thinking",
    "description": "Qwen3-VL-30B-A3B-Thinking is a multimodal model that unifies strong text generation with visual understanding for images and videos. Its Thinking variant enhances reasoning in STEM, math, and complex tasks. It excels in perception of real-world/synthetic categories, 2D/3D spatial grounding, and l...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.000001"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1759794479
  },
  {
    "id": "qwen/qwen3-vl-32b-instruct",
    "name": "Qwen: Qwen3 VL 32B Instruct",
    "description": "Qwen3-VL-32B-Instruct is a large-scale multimodal vision-language model designed for high-precision understanding and reasoning across text, images, and video. With 32 billion parameters, it combines deep visual perception with advanced text comprehension, enabling fine-grained spatial reasoning,...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0.0000005",
      "completion": "0.0000015"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1761231332
  },
  {
    "id": "qwen/qwen3-vl-8b-instruct",
    "name": "Qwen: Qwen3 VL 8B Instruct",
    "description": "Qwen3-VL-8B-Instruct is a multimodal vision-language model from the Qwen3-VL series, built for high-fidelity understanding and reasoning across text, images, and video. It features improved multimodal fusion with Interleaved-MRoPE for long-horizon temporal reasoning, DeepStack for fine-grained vi...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000008",
      "completion": "0.0000005"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1760463308
  },
  {
    "id": "qwen/qwen3-vl-8b-thinking",
    "name": "Qwen: Qwen3 VL 8B Thinking",
    "description": "Qwen3-VL-8B-Thinking is the reasoning-optimized variant of the Qwen3-VL-8B multimodal model, designed for advanced visual and textual reasoning across complex scenes, documents, and temporal sequences. It integrates enhanced multimodal alignment and long-context processing (native 256K, expandabl...",
    "context_length": 256000,
    "pricing": {
      "prompt": "0.00000018",
      "completion": "0.0000021"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1760463746
  },
  {
    "id": "qwen/qwq-32b",
    "name": "Qwen: QwQ 32B",
    "description": "QwQ is the reasoning model of the Qwen series. Compared with conventional instruction-tuned models, QwQ, which is capable of thinking and reasoning, can achieve significantly enhanced performance in downstream tasks, especially hard problems. QwQ-32B is the medium-sized reasoning model, which is ...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000015",
      "completion": "0.0000004"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen",
      "instruct_type": "qwq"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1741208814
  },
  {
    "id": "qwen/qwen-2.5-72b-instruct",
    "name": "Qwen2.5 72B Instruct",
    "description": "Qwen2.5 72B is the latest series of Qwen large language models. Qwen2.5 brings the following improvements upon Qwen2:\n\n- Significantly more knowledge and has greatly improved capabilities in coding and mathematics, thanks to our specialized expert models in these domains.\n\n- Significant improveme...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000012",
      "completion": "0.00000039"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen",
      "instruct_type": "chatml"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1726704000
  },
  {
    "id": "qwen/qwen-2.5-coder-32b-instruct",
    "name": "Qwen2.5 Coder 32B Instruct",
    "description": "Qwen2.5-Coder is the latest series of Code-Specific Qwen large language models (formerly known as CodeQwen). Qwen2.5-Coder brings the following improvements upon CodeQwen1.5:\n\n- Significantly improvements in **code generation**, **code reasoning** and **code fixing**. \n- A more comprehensive foun...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000003",
      "completion": "0.00000011"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen",
      "instruct_type": "chatml"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1731368400
  },
  {
    "id": "relace/relace-apply-3",
    "name": "Relace: Relace Apply 3",
    "description": "Relace Apply 3 is a specialized code-patching LLM that merges AI-suggested edits straight into your source files. It can apply updates from GPT-4o, Claude, and others into your files at 10,000 tokens/sec on average.\n\nThe model requires the prompt to be in the following format: \n<instruction>{inst...",
    "context_length": 256000,
    "pricing": {
      "prompt": "0.00000085",
      "completion": "0.00000125"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1758891572
  },
  {
    "id": "relace/relace-search",
    "name": "Relace: Relace Search",
    "description": "The relace-search model uses 4-12 `view_file` and `grep` tools in parallel to explore a codebase and return relevant files to the user request. \n\nIn contrast to RAG, relace-search performs agentic multi-step reasoning to produce highly precise results 4x faster than any frontier model. It's desig...",
    "context_length": 256000,
    "pricing": {
      "prompt": "0.000001",
      "completion": "0.000003"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1765213560
  },
  {
    "id": "undi95/remm-slerp-l2-13b",
    "name": "ReMM SLERP 13B",
    "description": "A recreation trial of the original MythoMax-L2-B13 but with updated models. #merge",
    "context_length": 6144,
    "pricing": {
      "prompt": "0.00000045",
      "completion": "0.00000065"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama2",
      "instruct_type": "alpaca"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1689984000
  },
  {
    "id": "sao10k/l3-lunaris-8b",
    "name": "Sao10K: Llama 3 8B Lunaris",
    "description": "Lunaris 8B is a versatile generalist and roleplaying model based on Llama 3. It's a strategic merge of multiple models, designed to balance creativity with improved logic and general knowledge.\n\nCreated by [Sao10k](https://huggingface.co/Sao10k), this model aims to offer an improved experience ov...",
    "context_length": 8192,
    "pricing": {
      "prompt": "0.00000004",
      "completion": "0.00000005"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1723507200
  },
  {
    "id": "sao10k/l3-euryale-70b",
    "name": "Sao10k: Llama 3 Euryale 70B v2.1",
    "description": "Euryale 70B v2.1 is a model focused on creative roleplay from [Sao10k](https://ko-fi.com/sao10k).\n\n- Better prompt adherence.\n- Better anatomy / spatial awareness.\n- Adapts much better to unique and custom formatting / reply formats.\n- Very creative, lots of unique swipes.\n- Is not restrictive du...",
    "context_length": 8192,
    "pricing": {
      "prompt": "0.00000148",
      "completion": "0.00000148"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1718668800
  },
  {
    "id": "sao10k/l3.1-70b-hanami-x1",
    "name": "Sao10K: Llama 3.1 70B Hanami x1",
    "description": "This is [Sao10K](/sao10k)'s experiment over [Euryale v2.2](/sao10k/l3.1-euryale-70b).",
    "context_length": 16000,
    "pricing": {
      "prompt": "0.000003",
      "completion": "0.000003"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1736302854
  },
  {
    "id": "sao10k/l3.1-euryale-70b",
    "name": "Sao10K: Llama 3.1 Euryale 70B v2.2",
    "description": "Euryale L3.1 70B v2.2 is a model focused on creative roleplay from [Sao10k](https://ko-fi.com/sao10k). It is the successor of [Euryale L3 70B v2.1](/models/sao10k/l3-euryale-70b).",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000065",
      "completion": "0.00000075"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1724803200
  },
  {
    "id": "sao10k/l3.3-euryale-70b",
    "name": "Sao10K: Llama 3.3 Euryale 70B",
    "description": "Euryale L3.3 70B is a model focused on creative roleplay from [Sao10k](https://ko-fi.com/sao10k). It is the successor of [Euryale L3 70B v2.2](/models/sao10k/l3-euryale-70b).",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000065",
      "completion": "0.00000075"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Llama3",
      "instruct_type": "llama3"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1734535928
  },
  {
    "id": "raifle/sorcererlm-8x22b",
    "name": "SorcererLM 8x22B",
    "description": "SorcererLM is an advanced RP and storytelling model, built as a Low-rank 16-bit LoRA fine-tuned on [WizardLM-2 8x22B](/microsoft/wizardlm-2-8x22b).\n\n- Advanced reasoning and emotional intelligence for engaging and immersive interactions\n- Vivid writing capabilities enriched with spatial and conte...",
    "context_length": 16000,
    "pricing": {
      "prompt": "0.0000045",
      "completion": "0.0000045"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral",
      "instruct_type": "vicuna"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1731105083
  },
  {
    "id": "stepfun-ai/step3",
    "name": "StepFun: Step3",
    "description": "Step3 is a cutting-edge multimodal reasoning model—built on a Mixture-of-Experts architecture with 321B total parameters and 38B active. It is designed end-to-end to minimize decoding costs while delivering top-tier performance in vision–language reasoning. Through the co-design of Multi-Matrix F...",
    "context_length": 65536,
    "pricing": {
      "prompt": "0.00000057",
      "completion": "0.00000142"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1756415375
  },
  {
    "id": "switchpoint/router",
    "name": "Switchpoint Router",
    "description": "Switchpoint AI's router instantly analyzes your request and directs it to the optimal AI from an ever-evolving library. \n\nAs the world of LLMs advances, our router gets smarter, ensuring you always benefit from the industry's newest models without changing your workflow.\n\nThis model is configured...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000085",
      "completion": "0.0000034"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1752272899
  },
  {
    "id": "tencent/hunyuan-a13b-instruct",
    "name": "Tencent: Hunyuan A13B Instruct",
    "description": "Hunyuan-A13B is a 13B active parameter Mixture-of-Experts (MoE) language model developed by Tencent, with a total parameter count of 80B and support for reasoning via Chain-of-Thought. It offers competitive benchmark performance across mathematics, science, coding, and multi-turn reasoning tasks,...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000014",
      "completion": "0.00000057"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1751987664
  },
  {
    "id": "thedrummer/cydonia-24b-v4.1",
    "name": "TheDrummer: Cydonia 24B V4.1",
    "description": "Uncensored and creative writing model based on Mistral Small 3.2 24B with good recall, prompt adherence, and intelligence.",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000005"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1758931878
  },
  {
    "id": "thedrummer/rocinante-12b",
    "name": "TheDrummer: Rocinante 12B",
    "description": "Rocinante 12B is designed for engaging storytelling and rich prose.\n\nEarly testers have reported:\n- Expanded vocabulary with unique and expressive word choices\n- Enhanced creativity for vivid narratives\n- Adventure-filled and captivating stories",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000017",
      "completion": "0.00000043"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Qwen",
      "instruct_type": "chatml"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1727654400
  },
  {
    "id": "thedrummer/skyfall-36b-v2",
    "name": "TheDrummer: Skyfall 36B V2",
    "description": "Skyfall 36B v2 is an enhanced iteration of Mistral Small 2501, specifically fine-tuned for improved creativity, nuanced writing, role-playing, and coherent storytelling.",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.00000055",
      "completion": "0.0000008"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1741636566
  },
  {
    "id": "thedrummer/unslopnemo-12b",
    "name": "TheDrummer: UnslopNemo 12B",
    "description": "UnslopNemo v4.1 is the latest addition from the creator of Rocinante, designed for adventure writing and role-play scenarios.",
    "context_length": 32768,
    "pricing": {
      "prompt": "0.0000004",
      "completion": "0.0000004"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral",
      "instruct_type": "mistral"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1731103448
  },
  {
    "id": "thudm/glm-4.1v-9b-thinking",
    "name": "THUDM: GLM 4.1V 9B Thinking",
    "description": "GLM-4.1V-9B-Thinking is a 9B parameter vision-language model developed by THUDM, based on the GLM-4-9B foundation. It introduces a reasoning-centric \"thinking paradigm\" enhanced with reinforcement learning to improve multimodal reasoning, long-context understanding (up to 64K tokens), and complex...",
    "context_length": 65536,
    "pricing": {
      "prompt": "0.000000035",
      "completion": "0.000000138"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1752244385
  },
  {
    "id": "tngtech/deepseek-r1t-chimera",
    "name": "TNG: DeepSeek R1T Chimera",
    "description": "DeepSeek-R1T-Chimera is created by merging DeepSeek-R1 and DeepSeek-V3 (0324), combining the reasoning capabilities of R1 with the token efficiency improvements of V3. It is based on a DeepSeek-MoE Transformer architecture and is optimized for general text generation tasks.\n\nThe model merges pret...",
    "context_length": 163840,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000012"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1745760875
  },
  {
    "id": "tngtech/deepseek-r1t-chimera:free",
    "name": "TNG: DeepSeek R1T Chimera (free)",
    "description": "DeepSeek-R1T-Chimera is created by merging DeepSeek-R1 and DeepSeek-V3 (0324), combining the reasoning capabilities of R1 with the token efficiency improvements of V3. It is based on a DeepSeek-MoE Transformer architecture and is optimized for general text generation tasks.\n\nThe model merges pret...",
    "context_length": 163840,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1745760875
  },
  {
    "id": "tngtech/deepseek-r1t2-chimera",
    "name": "TNG: DeepSeek R1T2 Chimera",
    "description": "DeepSeek-TNG-R1T2-Chimera is the second-generation Chimera model from TNG Tech. It is a 671 B-parameter mixture-of-experts text-generation model assembled from DeepSeek-AI’s R1-0528, R1, and V3-0324 checkpoints with an Assembly-of-Experts merge. The tri-parent design yields strong reasoning perfo...",
    "context_length": 163840,
    "pricing": {
      "prompt": "0.00000025",
      "completion": "0.00000085"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1751986985
  },
  {
    "id": "tngtech/deepseek-r1t2-chimera:free",
    "name": "TNG: DeepSeek R1T2 Chimera (free)",
    "description": "DeepSeek-TNG-R1T2-Chimera is the second-generation Chimera model from TNG Tech. It is a 671 B-parameter mixture-of-experts text-generation model assembled from DeepSeek-AI’s R1-0528, R1, and V3-0324 checkpoints with an Assembly-of-Experts merge. The tri-parent design yields strong reasoning perfo...",
    "context_length": 163840,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "DeepSeek"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1751986985
  },
  {
    "id": "tngtech/tng-r1t-chimera",
    "name": "TNG: R1T Chimera",
    "description": "TNG-R1T-Chimera is an experimental LLM with a faible for creative storytelling and character interaction. It is a derivate of the original TNG/DeepSeek-R1T-Chimera released in April 2025 and is available exclusively via Chutes and OpenRouter.\n\nCharacteristics and improvements include:\n\nWe think t...",
    "context_length": 163840,
    "pricing": {
      "prompt": "0.00000025",
      "completion": "0.00000085"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1764184161
  },
  {
    "id": "tngtech/tng-r1t-chimera:free",
    "name": "TNG: R1T Chimera (free)",
    "description": "TNG-R1T-Chimera is an experimental LLM with a faible for creative storytelling and character interaction. It is a derivate of the original TNG/DeepSeek-R1T-Chimera released in April 2025 and is available exclusively via Chutes and OpenRouter.\n\nCharacteristics and improvements include:\n\nWe think t...",
    "context_length": 163840,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1764184161
  },
  {
    "id": "alibaba/tongyi-deepresearch-30b-a3b",
    "name": "Tongyi DeepResearch 30B A3B",
    "description": "Tongyi DeepResearch is an agentic large language model developed by Tongyi Lab, with 30 billion total parameters activating only 3 billion per token. It's optimized for long-horizon, deep information-seeking tasks and delivers state-of-the-art performance on benchmarks like Humanity's Last Exam, ...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000009",
      "completion": "0.0000004"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1758210804
  },
  {
    "id": "alibaba/tongyi-deepresearch-30b-a3b:free",
    "name": "Tongyi DeepResearch 30B A3B (free)",
    "description": "Tongyi DeepResearch is an agentic large language model developed by Tongyi Lab, with 30 billion total parameters activating only 3 billion per token. It's optimized for long-horizon, deep information-seeking tasks and delivers state-of-the-art performance on benchmarks like Humanity's Last Exam, ...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1758210804
  },
  {
    "id": "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
    "name": "Venice: Uncensored (free)",
    "description": "Venice Uncensored Dolphin Mistral 24B Venice Edition is a fine-tuned variant of Mistral-Small-24B-Instruct-2501, developed by dphn.ai in collaboration with Venice.ai. This model is designed as an “uncensored” instruct-tuned LLM, preserving user control over alignment, system prompts, and behavior...",
    "context_length": 32768,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1752094966
  },
  {
    "id": "microsoft/wizardlm-2-8x22b",
    "name": "WizardLM-2 8x22B",
    "description": "WizardLM-2 8x22B is Microsoft AI's most advanced Wizard model. It demonstrates highly competitive performance compared to leading proprietary models, and it consistently outperforms all existing state-of-the-art opensource models.\n\nIt is an instruct finetune of [Mixtral 8x22B](/models/mistralai/m...",
    "context_length": 65536,
    "pricing": {
      "prompt": "0.00000048",
      "completion": "0.00000048"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Mistral",
      "instruct_type": "vicuna"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1713225600
  },
  {
    "id": "x-ai/grok-3",
    "name": "xAI: Grok 3",
    "description": "Grok 3 is the latest model from xAI. It's their flagship model that excels at enterprise use cases like data extraction, coding, and text summarization. Possesses deep domain knowledge in finance, healthcare, law, and science.\n\n",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.000003",
      "completion": "0.000015"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Grok"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1749582908
  },
  {
    "id": "x-ai/grok-3-beta",
    "name": "xAI: Grok 3 Beta",
    "description": "Grok 3 is the latest model from xAI. It's their flagship model that excels at enterprise use cases like data extraction, coding, and text summarization. Possesses deep domain knowledge in finance, healthcare, law, and science.\n\nExcels in structured tasks and benchmarks like GPQA, LCB, and MMLU-Pr...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.000003",
      "completion": "0.000015"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Grok"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1744240068
  },
  {
    "id": "x-ai/grok-3-mini",
    "name": "xAI: Grok 3 Mini",
    "description": "A lightweight model that thinks before responding. Fast, smart, and great for logic-based tasks that do not require deep domain knowledge. The raw thinking traces are accessible.",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000005"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Grok"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1749583245
  },
  {
    "id": "x-ai/grok-3-mini-beta",
    "name": "xAI: Grok 3 Mini Beta",
    "description": "Grok 3 Mini is a lightweight, smaller thinking model. Unlike traditional models that generate answers immediately, Grok 3 Mini thinks before responding. It’s ideal for reasoning-heavy tasks that don’t demand extensive domain knowledge, and shines in math-specific and quantitative use cases, such ...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000005"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Grok"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1744240195
  },
  {
    "id": "x-ai/grok-4",
    "name": "xAI: Grok 4",
    "description": "Grok 4 is xAI's latest reasoning model with a 256k context window. It supports parallel tool calling, structured outputs, and both image and text inputs. Note that reasoning is not exposed, reasoning cannot be disabled, and the reasoning effort cannot be specified. Pricing increases once the tota...",
    "context_length": 256000,
    "pricing": {
      "prompt": "0.000003",
      "completion": "0.000015"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Grok"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1752087689
  },
  {
    "id": "x-ai/grok-4-fast",
    "name": "xAI: Grok 4 Fast",
    "description": "Grok 4 Fast is xAI's latest multimodal model with SOTA cost-efficiency and a 2M token context window. It comes in two flavors: non-reasoning and reasoning. Read more about the model on xAI's [news post](http://x.ai/news/grok-4-fast).\n\nReasoning can be enabled/disabled using the `reasoning` `enabl...",
    "context_length": 2000000,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000005"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Grok"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1758240090
  },
  {
    "id": "x-ai/grok-4.1-fast",
    "name": "xAI: Grok 4.1 Fast",
    "description": "Grok 4.1 Fast is xAI's best agentic tool calling model that shines in real-world use cases like customer support and deep research. 2M context window.\n\nReasoning can be enabled/disabled using the `reasoning` `enabled` parameter in the API. [Learn more in our docs](https://openrouter.ai/docs/use-c...",
    "context_length": 2000000,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000005"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Grok"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1763587502
  },
  {
    "id": "x-ai/grok-code-fast-1",
    "name": "xAI: Grok Code Fast 1",
    "description": "Grok Code Fast 1 is a speedy and economical reasoning model that excels at agentic coding. With reasoning traces visible in the response, developers can steer Grok Code for high-quality work flows.",
    "context_length": 256000,
    "pricing": {
      "prompt": "0.0000002",
      "completion": "0.0000015"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Grok"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1756238927
  },
  {
    "id": "xiaomi/mimo-v2-flash:free",
    "name": "Xiaomi: MiMo-V2-Flash (free)",
    "description": "MiMo-V2-Flash is an open-source foundation language model developed by Xiaomi. It is a Mixture-of-Experts model with 309B total parameters and 15B active parameters, adopting hybrid attention architecture. MiMo-V2-Flash supports a hybrid-thinking toggle and a 256K context window, and excels at re...",
    "context_length": 262144,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1765731308
  },
  {
    "id": "z-ai/glm-4-32b",
    "name": "Z.AI: GLM 4 32B ",
    "description": "GLM 4 32B is a cost-effective foundation language model.\n\nIt can efficiently perform complex tasks and has significantly enhanced capabilities in tool use, online search, and code-related intelligent tasks.\n\nIt is made by the same lab behind the thudm models.",
    "context_length": 128000,
    "pricing": {
      "prompt": "0.0000001",
      "completion": "0.0000001"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1753376617
  },
  {
    "id": "z-ai/glm-4.5",
    "name": "Z.AI: GLM 4.5",
    "description": "GLM-4.5 is our latest flagship foundation model, purpose-built for agent-based applications. It leverages a Mixture-of-Experts (MoE) architecture and supports a context length of up to 128k tokens. GLM-4.5 delivers significantly enhanced capabilities in reasoning, code generation, and agent align...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000035",
      "completion": "0.00000155"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1753471347
  },
  {
    "id": "z-ai/glm-4.5-air",
    "name": "Z.AI: GLM 4.5 Air",
    "description": "GLM-4.5-Air is the lightweight variant of our latest flagship model family, also purpose-built for agent-centric applications. Like GLM-4.5, it adopts the Mixture-of-Experts (MoE) architecture but with a more compact parameter size. GLM-4.5-Air also supports hybrid inference modes, offering a \"th...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.00000013",
      "completion": "0.00000085"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1753471258
  },
  {
    "id": "z-ai/glm-4.5-air:free",
    "name": "Z.AI: GLM 4.5 Air (free)",
    "description": "GLM-4.5-Air is the lightweight variant of our latest flagship model family, also purpose-built for agent-centric applications. Like GLM-4.5, it adopts the Mixture-of-Experts (MoE) architecture but with a more compact parameter size. GLM-4.5-Air also supports hybrid inference modes, offering a \"th...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0",
      "completion": "0"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1753471258
  },
  {
    "id": "z-ai/glm-4.5v",
    "name": "Z.AI: GLM 4.5V",
    "description": "GLM-4.5V is a vision-language foundation model for multimodal agent applications. Built on a Mixture-of-Experts (MoE) architecture with 106B parameters and 12B activated parameters, it achieves state-of-the-art results in video understanding, image Q&A, OCR, and document parsing, with strong gain...",
    "context_length": 65536,
    "pricing": {
      "prompt": "0.0000006",
      "completion": "0.0000018"
    },
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1754922288
  },
  {
    "id": "z-ai/glm-4.6",
    "name": "Z.AI: GLM 4.6",
    "description": "Compared with GLM-4.5, this generation brings several key improvements:\n\nLonger context window: The context window has been expanded from 128K to 200K tokens, enabling the model to handle more complex agentic tasks.\nSuperior coding performance: The model achieves higher scores on code benchmarks ...",
    "context_length": 202752,
    "pricing": {
      "prompt": "0.00000035",
      "completion": "0.0000015"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1759235576
  },
  {
    "id": "z-ai/glm-4.6:exacto",
    "name": "Z.AI: GLM 4.6 (exacto)",
    "description": "Compared with GLM-4.5, this generation brings several key improvements:\n\nLonger context window: The context window has been expanded from 128K to 200K tokens, enabling the model to handle more complex agentic tasks.\nSuperior coding performance: The model achieves higher scores on code benchmarks ...",
    "context_length": 204800,
    "pricing": {
      "prompt": "0.00000044",
      "completion": "0.00000176"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1759235576
  },
  {
    "id": "z-ai/glm-4.6v",
    "name": "Z.AI: GLM 4.6V",
    "description": "GLM-4.6V is a large multimodal model designed for high-fidelity visual understanding and long-context reasoning across images, documents, and mixed media. It supports up to 128K tokens, processes complex page layouts and charts directly as visual inputs, and integrates native multimodal function ...",
    "context_length": 131072,
    "pricing": {
      "prompt": "0.0000003",
      "completion": "0.0000009"
    },
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "video"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1765207462
  },
  {
    "id": "z-ai/glm-4.7",
    "name": "Z.AI: GLM 4.7",
    "description": "GLM-4.7 is Z.AI’s latest flagship model, featuring upgrades in two key areas: enhanced programming capabilities and more stable multi-step reasoning/execution. It demonstrates significant improvements in executing complex agent tasks while delivering more natural conversational experiences and su...",
    "context_length": 202752,
    "pricing": {
      "prompt": "0.0000004",
      "completion": "0.0000015"
    },
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ],
      "tokenizer": "Other"
    },
    "top_provider": {
      "is_moderated": false
    },
    "created": 1766378014
  }
];

export const OPENROUTER_DATA_META = {
    generatedAt: '2026-01-03',
    totalModels: 353,
    source: 'https://openrouter.ai',
};
