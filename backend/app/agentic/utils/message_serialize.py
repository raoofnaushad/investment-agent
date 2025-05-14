from autogen_agentchat.messages import TextMessage, ToolCallRequestEvent, ToolCallExecutionEvent
from autogen_agentchat.base import TaskResult
from autogen_core.models._types import RequestUsage

def serialize_models_usage(usage):
    if usage is None:
        return None
    return {
        "prompt_tokens": usage.prompt_tokens,
        "completion_tokens": usage.completion_tokens
    }

def serialize_text_message(msg: TextMessage):
    msg_dict = msg.model_dump()
    msg_dict["models_usage"] = serialize_models_usage(msg.models_usage)
    msg_dict["message_type"] = "TextMessage"
    return msg_dict

def serialize_tool_call_request_event(event: ToolCallRequestEvent):
    event_dict = event.model_dump()
    event_dict["models_usage"] = serialize_models_usage(event.models_usage)
    event_dict["message_type"] = "ToolCallRequestEvent"
    return event_dict

def serialize_tool_call_execution_event(event: ToolCallExecutionEvent):
    event_dict = event.model_dump()
    event_dict["models_usage"] = serialize_models_usage(event.models_usage)
    event_dict["message_type"] = "ToolCallExecutionEvent"
    return event_dict

def serialize_task_result(task_result: TaskResult):
    # Manually construct the dictionary representation
    result_dict = {
        "messages": [serialize_message(msg) for msg in task_result.messages],
        "stop_reason": task_result.stop_reason,
        "message_type": "TaskResult"
    }
    return result_dict

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