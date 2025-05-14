from autogen_agentchat.messages import TextMessage, ToolCallRequestEvent, ToolCallExecutionEvent
from autogen_agentchat.base import TaskResult
from autogen_core.models._types import RequestUsage

def serialize_models_usage(usage):
    if usage is None:
        return "N/A"
    if isinstance(usage, dict):
        return {
            "prompt_tokens": usage.get("prompt_tokens", "N/A"),
            "completion_tokens": usage.get("completion_tokens", "N/A")
        }
    return {
        "prompt_tokens": getattr(usage, "prompt_tokens", "N/A"),
        "completion_tokens": getattr(usage, "completion_tokens", "N/A")
    }

def serialize_text_message(msg: TextMessage):
    msg_dict = msg.model_dump()
    return {
        "source": msg_dict.get("source", "N/A"),
        "message_type": "TextMessage",
        "content": msg_dict.get("content", "N/A"),
        "models_usage": serialize_models_usage(msg_dict.get("models_usage"))
    }

def serialize_tool_call_request_event(event: ToolCallRequestEvent):
    event_dict = event.model_dump()
    return {
        "source": event_dict.get("source", "N/A"),
        "message_type": "ToolCallRequestEvent",
        "content": event_dict.get("content", "N/A"),
        "models_usage": serialize_models_usage(event_dict.get("models_usage"))
    }

def serialize_tool_call_execution_event(event: ToolCallExecutionEvent):
    event_dict = event.model_dump()
    return {
        "source": event_dict.get("source", "N/A"),
        "message_type": "ToolCallExecutionEvent",
        "content": event_dict.get("content", "N/A"),
        "models_usage": serialize_models_usage(event_dict.get("models_usage"))
    }

def serialize_task_result(task_result: TaskResult):
    if not task_result.messages:
        return {
            "source": "N/A",
            "message_type": "TaskResult",
            "content": "N/A",
            "models_usage": "N/A"
        }
    last_message = task_result.messages[-1]
    return serialize_message(last_message)

def serialize_message(obj):
    if isinstance(obj, TextMessage):
        return serialize_text_message(obj)
    elif isinstance(obj, ToolCallRequestEvent):
        return serialize_tool_call_request_event(obj)
    elif isinstance(obj, ToolCallExecutionEvent):
        return serialize_tool_call_execution_event(obj)
    elif isinstance(obj, TaskResult):
        return serialize_task_result(obj)
    else:
        raise TypeError(f"Unsupported type: {type(obj)}")