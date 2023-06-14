from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from django.core.files.storage import default_storage
from .models import Movie


@receiver(pre_save, sender=Movie)
def delete_old_banner(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = Movie.objects.get(pk=instance.pk)
        except Movie.DoesNotExist:
            return
        new_image = instance.banner
        old_image = old_instance.banner
        if old_image and old_image != new_image:
            default_storage.delete(old_image.path)

@receiver(pre_save, sender=Movie)
def delete_old_background(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = Movie.objects.get(pk=instance.pk)
        except Movie.DoesNotExist:
            return
        new_image = instance.background
        old_image = old_instance.background
        if old_image and old_image != new_image:
            default_storage.delete(old_image.path)

@receiver(pre_save, sender=Movie)
def delete_old_source(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = Movie.objects.get(pk=instance.pk)
        except Movie.DoesNotExist:
            return
        new_source = instance.source_link
        old_source = old_instance.source_link
        if old_source and old_source != new_source:
            default_storage.delete(old_source.path)

@receiver(pre_save, sender=Movie)
def delete_old_trailer(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = Movie.objects.get(pk=instance.pk)
        except Movie.DoesNotExist:
            return
        new_source = instance.trailer_link
        old_source = old_instance.trailer_link
        if old_source and old_source != new_source:
            default_storage.delete(old_source.path)

##################################

@receiver(post_delete, sender=Movie)
def delete_old_source(sender, instance, **kwargs):
    if instance.background:
        default_storage.delete(instance.background.path)
    if instance.banner:
        default_storage.delete(instance.banner.path)
    if instance.source_link:
        default_storage.delete(instance.source_link.path)
    if instance.trailer_link:
        default_storage.delete(instance.trailer_link.path)